ace.define('ace/theme/gruvbox_dark_hard.css', ['require', 'exports', 'module'], function (require, exports, module) {
  module.exports =
    '.ace-gruvbox-dark-hard .ace_gutter {\n  background: #1d2021;\n  color: rgb(132,126,106)\n}\n\n.ace-gruvbox-dark-hard .ace_print-margin {\n  width: 1px;\n  background: #e8e8e8\n}\n\n.ace-gruvbox-dark-hard {\n  background-color: #1d2021;\n  color: rgba(235, 219, 178, 0.50)\n}\n\n.ace-gruvbox-dark-hard .ace_cursor {\n  color: #a89984\n}\n\n.ace-gruvbox-dark-hard .ace_marker-layer .ace_selection {\n  background: #3c3836\n}\n\n.ace-gruvbox-dark-hard.ace_multiselect .ace_selection.ace_start {\n  box-shadow: 0 0 3px 0px #1d2021;\n  border-radius: 2px\n}\n\n.ace-gruvbox-dark-hard .ace_marker-layer .ace_step {\n  background: rgb(198, 219, 174)\n}\n\n.ace-gruvbox-dark-hard .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgba(235, 219, 178, 0.15)\n}\n\n.ace-gruvbox-dark-hard .ace_marker-layer .ace_active-line {\n  background: #3c3836\n}\n\n.ace-gruvbox-dark-hard .ace_gutter-active-line {\n  background-color: #3c3836\n}\n\n.ace-gruvbox-dark-hard .ace_marker-layer .ace_selected-word {\n  border: 1px solid #3c3836\n}\n\n.ace-gruvbox-dark-hard .ace_fold {\n  background-color: #b8bb26;\n  border-color: rgba(235, 219, 178, 0.50)\n}\n\n.ace-gruvbox-dark-hard .ace_keyword {\n  color: #fb4934\n}\n\n.ace-gruvbox-dark-hard .ace_keyword.ace_operator {\n  color: #8ec07c\n}\n\n.ace-gruvbox-dark-hard .ace_keyword.ace_other.ace_unit {\n  color: #b16286\n}\n\n.ace-gruvbox-dark-hard .ace_constant {\n  color: #d3869b\n}\n\n.ace-gruvbox-dark-hard .ace_constant.ace_numeric {\n  color: #d3869b\n}\n\n.ace-gruvbox-dark-hard .ace_constant.ace_character.ace_escape {\n  color: #fb4934\n}\n\n.ace-gruvbox-dark-hard .ace_constant.ace_other {\n  color: #d3869b\n}\n\n.ace-gruvbox-dark-hard .ace_support.ace_function {\n  color: #8ec07c\n}\n\n.ace-gruvbox-dark-hard .ace_support.ace_constant {\n  color: #d3869b\n}\n\n.ace-gruvbox-dark-hard .ace_support.ace_constant.ace_property-value {\n  color: #f9f5d7\n}\n\n.ace-gruvbox-dark-hard .ace_support.ace_class {\n  color: #fabd2f\n}\n\n.ace-gruvbox-dark-hard .ace_support.ace_type {\n  color: #fabd2f\n}\n\n.ace-gruvbox-dark-hard .ace_storage {\n  color: #fb4934\n}\n\n.ace-gruvbox-dark-hard .ace_invalid {\n  color: #f9f5d7;\n  background-color: #fb4934\n}\n\n.ace-gruvbox-dark-hard .ace_string {\n  color: #b8bb26\n}\n\n.ace-gruvbox-dark-hard .ace_string.ace_regexp {\n  color: #b8bb26\n}\n\n.ace-gruvbox-dark-hard .ace_comment {\n  font-style: italic;\n  color: #928374\n}\n\n.ace-gruvbox-dark-hard .ace_variable {\n  color: #83a598\n}\n\n.ace-gruvbox-dark-hard .ace_variable.ace_language {\n  color: #d3869b\n}\n\n.ace-gruvbox-dark-hard .ace_variable.ace_parameter {\n  color: #f9f5d7\n}\n\n.ace-gruvbox-dark-hard .ace_meta.ace_tag {\n  color: #f9f5d7\n}\n\n.ace-gruvbox-dark-hard .ace_entity.ace_other.ace_attribute-name {\n  color: #fabd2f\n}\n\n.ace-gruvbox-dark-hard .ace_entity.ace_name.ace_function {\n  color: #b8bb26\n}\n\n.ace-gruvbox-dark-hard .ace_entity.ace_name.ace_tag {\n  color: #83a598\n}\n\n.ace-gruvbox-dark-hard .ace_markup.ace_heading {\n  color: #b8bb26\n}\n\n.ace-gruvbox-dark-hard .ace_markup.ace_list {\n  color: #83a598\n}\n\n.ace-gruvbox-dark-hard .ace_indent-guide-active {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;\n}\n';
});

ace.define(
  'ace/theme/gruvbox_dark_hard',
  ['require', 'exports', 'module', 'ace/theme/gruvbox_dark_hard.css', 'ace/lib/dom'],
  function (require, exports, module) {
    exports.isDark = true;
    exports.cssClass = 'ace-gruvbox-dark-hard';
    exports.cssText = require('./gruvbox_dark_hard.css');
    var dom = require('../lib/dom');
    dom.importCssString(exports.cssText, exports.cssClass);
  },
);
(function () {
  ace.require(['ace/theme/gruvbox_dark_hard'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m;
    }
  });
})();
