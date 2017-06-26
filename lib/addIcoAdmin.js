import t from 'tcomb-form';

const AddIcoAdmin = t.struct({
    adminEmail: t.String,
    slugUrlToken: t.String,
});

export {AddIcoAdmin};
