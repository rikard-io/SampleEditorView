/* global describe, it, before */

import chai from 'chai';
import SampleEditorView from '../src/SampleEditorView.js';

chai.expect();

const expect = chai.expect;

// ... to do :)

let sampleEditorView;

describe('SampleEditorView', () => {
  before(() => {
    sampleEditorView = new SampleEditorView();
  });
  describe('props', () => {
    it('should be an object', () => {
      expect(sampleEditorView.props).to.be.an('object');
    });
  });
});
