
export default class AppUtils {

  static getProdPredicate (production) {
    return production ? AppUtils.isDataStatusProd : AppUtils.isDataStatusTest;
  }

  static isDataStatusTest (icoProject) {
    if (!icoProject.meta) {
      return false;
    }
    return icoProject.meta.dataStatus === 'test';
  }

  static isDataStatusProd (icoProject) {
    if (!icoProject.meta) {
      return true;
    }
    return icoProject.meta.dataStatus === 'production';
  }
}
