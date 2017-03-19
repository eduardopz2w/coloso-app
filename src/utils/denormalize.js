import Immutable from 'immutable';

export default function denormalize(id, entityType, entities) {
  return Immutable.Map({}).withMutations((mutator) => {
    const attrsMap = entities.getIn([entityType, id, 'attributes']);

    mutator.set('id', id);

    if (attrsMap) {
      attrsMap.forEach((attrData, attrKey) => {
        mutator.set(attrKey, attrData);
      });
    }

    const relationShipMap = entities.getIn([entityType, id, 'relationships']);

    if (relationShipMap instanceof Immutable.Map) {
      relationShipMap.forEach((relData, relKey) => {
        if (relData instanceof Immutable.Map) {
          const relId = relData.get('id');
          const relType = relData.get('type');
          mutator.set(relKey, denormalize(relId, relType, entities));
        }

        if (relData instanceof Immutable.List) {
          mutator.set(relKey, relData.map((relMap) => {
            const relId = relMap.get('id');
            const relType = relMap.get('type');
            return denormalize(relId, relType, entities);
          }));
        }
      });
    }
  });
}
