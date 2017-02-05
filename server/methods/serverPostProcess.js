
export default class PostProcess {

  static normalizeIcoProject (icoProject) {
    icoProject = PostProcess.setDefaultValForArrays(icoProject);
    icoProject = PostProcess.setPseudoDateSequence(icoProject);
    return icoProject;
  }

  static setDefaultValForArrays (icoProject) {
    icoProject.icoEvents = icoProject.icoEvents || [];
    icoProject.coFounders = icoProject.coFounders || [];
    icoProject.otherLinks = icoProject.otherLinks || [];
    return icoProject;
  }

  static setPseudoDateSequence (icoProject) {
    const pseudoDateSequence = 2222222222222;
    icoProject.icoStartDatetime = icoProject.icoStartDatetime || new Date(pseudoDateSequence);
    icoProject.icoEndDatetime = icoProject.icoEndDatetime || new Date(pseudoDateSequence);
    return icoProject;
  }

}
