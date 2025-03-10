// BEGIN-SNIPPET server-side-filter-component
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import { debounce } from '@ember/runloop';
import Component from '@glimmer/component';
import RSVP from 'rsvp';

export default class ServerSideFilterComponent extends Component {
  @service() store;

  instances = null;
  selectedInstance = null;

  @action
  searchInstances(userInput) {
    return new RSVP.Promise((resolve, reject) =>
      debounce(
        this,
        this._performSearchInstances,
        userInput,
        resolve,
        reject,
        100
      )
    );
  }

  @action
  updateColumnFilter(instance) {
    set(this, 'selectedInstance', instance);
    const filterString = instance ? instance.id : '';
    set(this, 'column.filterString', filterString);
  }

  columnsFilterStringIsDropped() {
    if (!this.args.column.filterString) {
      set(this, 'selectedInstance', null);
    }
  }

  formatQuery(query, userInput) {
    query.firstName = userInput;
    return query;
  }

  _performSearchInstances(userInput, resolve, reject) {
    let query = this.instances ? this.instances.query : { page: 1 };
    query = this.formatQuery(query, userInput);
    return this.store
      .query('user', query)
      .then((instances) => {
        set(this, 'instances', instances);
        resolve(instances);
      })
      .catch((e) => reject(e));
  }
}
// END-SNIPPET
