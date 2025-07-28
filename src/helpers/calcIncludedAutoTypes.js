import { VEHICLES_GROUPS } from '../constants';

export const calcIsE_F_G3 = (autoType) =>
  [VEHICLES_GROUPS.EF.E, VEHICLES_GROUPS.EF.F, VEHICLES_GROUPS.G.G3]?.includes(
    autoType
  );
export const calcIsB5 = (autoType) => [VEHICLES_GROUPS.B.B5]?.includes(autoType);
export const calcIsWithoutE_F_G3_B5 = (autoType) =>
  ![
    VEHICLES_GROUPS.EF.E,
    VEHICLES_GROUPS.EF.F,
    VEHICLES_GROUPS.G.G3,
    VEHICLES_GROUPS.B.B5,
  ]?.includes(autoType);
export const calcIsWithoutE_F_G3_AllB = (autoType) =>
  ![
    VEHICLES_GROUPS.EF.E,
    VEHICLES_GROUPS.EF.F,
    VEHICLES_GROUPS.G.G3,
    ...Object.values(VEHICLES_GROUPS.B).filter((el) => el.length > 1),
  ]?.includes(autoType);
