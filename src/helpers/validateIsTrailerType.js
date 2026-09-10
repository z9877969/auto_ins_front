import { VEHICLES_GROUPS } from '@constants/index';

const trailerTypes = [
  VEHICLES_GROUPS.EF.E,
  VEHICLES_GROUPS.EF.F,
  VEHICLES_GROUPS.G.G3,
];

export const validateIsTrailerType = (engineType) => {
  return trailerTypes.includes(engineType);
};
