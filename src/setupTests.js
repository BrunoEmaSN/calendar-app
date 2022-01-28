import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-to-json';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer( createSerializer({ mode: 'deep' }) );
