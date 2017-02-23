
export default class BrowserViewUtils {
  // todo make JSdoc
  static getOffsetObj (elem) {
    if (!elem) {
      return {};
    }
    const rect = elem.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

}
