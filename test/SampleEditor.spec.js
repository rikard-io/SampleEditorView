/* global describe, it, before */

import chai from 'chai';
import SampleEditor from '../src/SampleEditor.js';

chai.expect();

const expect = chai.expect;

// ... to do :)

let sampleEditor;

describe('SampleEditor', () => {
  before(() => {
    sampleEditor = new SampleEditor();
  });
  describe('props', () => {
    it('should be an object', () => {
      expect(sampleEditor.props).to.be.an('object');
    });
  });
});
