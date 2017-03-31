import {IcoProjects} from '/lib/collections';

export default () => {
  IcoProjects.friendlySlugs({
    slugFrom: ['projectName', 'abbreviation'],
    slugField: 'slugUrlToken',
    distinct: true,
    updateSlug: false,
    // if the slugField is empty, create slug on object during update mongo collection (upsert not supported)
    createOnUpdate: true,
    debug: false
  });
}
