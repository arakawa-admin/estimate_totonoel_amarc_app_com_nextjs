import { seedMasterLoginUsers } from './master_login_users.seed.mjs';

import { seedMasterPlaces } from './master_places.seed.mjs';
import { seedMasterNorms } from './master_norms.seed.mjs';
import { seedMasterAbstracts } from './master_abstracts.seed.mjs';
import { seedMasterUnits } from './master_units.seed.mjs';
import { seedMasterCars } from './master_cars.seed.mjs';
import { seedMasterWorkers } from './master_workers.seed.mjs';

(async () => {
  try {
    await seedMasterLoginUsers();

    await seedMasterPlaces();
    await seedMasterNorms();
    await seedMasterAbstracts();
    await seedMasterUnits();
    await seedMasterCars();
    await seedMasterWorkers();

    console.log('Seed completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
})();
