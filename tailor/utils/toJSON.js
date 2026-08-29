function applyToJSON(schema, { hide = [], refs = [] } = {}) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      for (const field of refs) {
        if (ret[field] != null) ret[field] = ret[field].toString();
      }
      for (const field of ['owner', ...hide]) {
        delete ret[field];
      }
      return ret;
    },
  });
}

module.exports = { applyToJSON };
