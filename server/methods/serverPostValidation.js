
export default class PostValidation {

  static normalizeIcoProject (icoProject) {
    icoProject.icoEvents = icoProject.icoEvents || [];
    icoProject.coFounders = icoProject.coFounders || [];
    icoProject.otherLinks = icoProject.otherLinks || [];
    return icoProject;
  }
}
