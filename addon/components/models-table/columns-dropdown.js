import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * Dropdown with list of table's columns used within [models-table](Components.ModelsTable.html).
 *
 * It allows to toggle visibility for column sets or single column.
 *
 * Columns that should not be hidden must have property [mayBeHidden](Utils.ModelsTableColumn.html#property_mayBeHidden) set to `false`.
 *
 * Usage example:
 *
 * ```hbs
 * <ModelsTable @data={{data}} @columns={{columns}} as |MT|>
 *   <MT.ColumnsDropdown />
 *   {{! .... }}
 * </ModelsTable>
 * ```
 *
 * Block usage example:
 *
 * ```hbs
 * <ModelsTable @data={{data}} @columns={{columns}} as |MT|>
 *   <MT.ColumnsDropdown as |CD|>
 *     {{#if MT.columnDropdownOptions.showAll}}
 *       <button {{action MT.showAllColumns}}>Show all</button>
 *     {{/if}}
 *     {{#if MT.columnDropdownOptions.hideAll}}
 *       <button {{action MT.hideAllColumns}}>Hide all</button>
 *     {{/if}}
 *     {{#if MT.columnDropdownOptions.restoreDefaults}}
 *       <button {{action MT.restoreDefaultVisibility}}>Restore default visibility</button>
 *     {{/if}}
 *     {{#each MT.columnDropdownOptions.columnSets as |columnSet|}}
 *       <button {{action MT.toggleColumnSetVisibility columnSet}}>{{columnSet.label}}</button>
 *     {{/each}}
 *     {{#each MT.processedColumns as |column|}}
 *       {{#if column.mayBeHidden}}
 *         <button {{action MT.toggleHidden column}}>
 *           <i class={{if column.toggleColumnVisibility MT.themeInstance.columnVisibleIcon MT.themeInstance.columnHiddenIcon}}></i>
 *           {{column.columnTitle}}
 *         </button>
 *       {{/if}}
 *     {{/each}}
 *   </MT.ColumnsDropdown>
 *   {{! .... }}
 * </ModelsTable>
 * ```
 *
 * @namespace Components
 * @class ModelsTableColumnsDropdown
 * @extends Glimmer.Component
 */
export default class ColumnsDropdownComponent extends Component {
  /**
   * @event doShowAllColumns
   * @param {Event} e
   * @protected
   */
  @action
  doShowAllColumns(e) {
    this.args.showAllColumns();
    e?.stopPropagation();
    return false;
  }

  /**
   * @event doHideAllColumns
   * @param {Event} e
   * @protected
   */
  @action
  doHideAllColumns(e) {
    this.args.hideAllColumns();
    e?.stopPropagation();
    return false;
  }

  /**
   * @event doRestoreDefaultVisibility
   * @param {Event} e
   * @protected
   */
  @action
  doRestoreDefaultVisibility(e) {
    this.args.restoreDefaultVisibility();
    e?.stopPropagation();
    return false;
  }

  /**
   * @event doToggleColumnSet
   * @param {ColumnSet} columnSet
   * @param {Event} e
   * @protected
   */
  @action
  doToggleColumnSet(columnSet, e) {
    this.args.toggleColumnSet(columnSet);
    e?.stopPropagation();
    return false;
  }

  /**
   * @event doToggleHidden
   * @param {Utils.ModelsTableColumn} column
   * @param {Event} e
   * @protected
   */
  @action
  doToggleHidden(column, e) {
    this.args.toggleHidden(column);
    e?.stopPropagation();
    return false;
  }
}
