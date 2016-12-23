import _ from 'lodash';

const queues = [
  { id: 0, name: 'Partida Personalizada' },
  { id: 8, name: 'Normal 3 vs 3' },
  { id: 2, name: 'Normal 5 vs 5' },
  { id: 14, name: 'Normal 5 vs 5' },
  { id: 4, name: 'Ranked Solo 5 vs 5' },
  { id: 6, name: 'Ranked Premade 5 vs 5' },
  { id: 9, name: 'Ranked Flexible' },
  { id: 41, name: 'Ranked Team 3 vs 3' },
  { id: 42, name: 'Ranked Team 5 vs 5' },
  { id: 16, name: 'Dominion 5 vs 5' },
  { id: 17, name: 'Dominion 5 vs 5' },
  { id: 25, name: 'Dominion (Bots)' },
  { id: 31, name: 'Bots (Introductorio)' },
  { id: 32, name: 'Bots (Facil)' },
  { id: 33, name: 'Bots (Intermedio)' },
  { id: 52, name: 'Bots 3 vs 3' },
  { id: 61, name: 'Normal 5 vs 5' },
  { id: 65, name: 'Aram' },
  { id: 70, name: 'Uno para todos' },
  { id: 72, name: 'Primera sangre 1 vs 1' },
  { id: 73, name: 'Primera sangre 2 vs 2' },
  { id: 75, name: 'Hexakill' },
  { id: 76, name: 'Rapido y feróz' },
  { id: 78, name: 'Uno para todos (Mirror)' },
  { id: 83, name: 'Rapido y feróz (Bots)' },
  { id: 91, name: 'Bots malditos (Nivel 1)' },
  { id: 92, name: 'Bots malditos (Nivel 2)' },
  { id: 93, name: 'Bots malditos (Nivel 3)' },
  { id: 96, name: 'Ascensión' },
  { id: 98, name: 'Hexakill' },
  { id: 100, name: 'Aram Embrujado' },
  { id: 300, name: 'La leyenda del rey poro' },
  { id: 310, name: 'Nemesis' },
  { id: 313, name: 'Mercado Negro' },
  { id: 315, name: 'Asedio del nexo' },
  { id: 317, name: 'Este no es dominion' },
  { id: 318, name: 'Rapido y feróz (Aleatorio)' },
  { id: 400, name: 'Normal 5 vs 5' },
  { id: 410, name: 'Ranked 5 vs 5' },
  { id: 420, name: 'Ranked Solo' },
  { id: 440, name: 'Ranked Flexible' },
];

export default function (id) {
  const queueFound = _.find(queues, { id });

  if (queueFound) {
    return queueFound.name;
  }

  return id;
}
