
export default class BrowserViewUtils {

  static getOffsetObj (elem) {
    if (!elem) {
      throw new Error('no element was found');
    }
    const rect = elem.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

}
