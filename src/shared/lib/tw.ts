import { create, useDeviceContext, useAppColorScheme } from 'twrnc';
import config from '../../../tailwind.config';

const tw = create(config);

export { useDeviceContext, useAppColorScheme };
export default tw;
