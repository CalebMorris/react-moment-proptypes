import { describe } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import { setup, assertRenderSuccess, assertRenderFailure, TestUtilError } from './util';
import { durationPrimitive } from '../../src/index';
import { messages } from '../../src/core';

const successIdKey = '#success';
class MomentDurationPrimitives extends React.Component {
  render() {
    return (
      <h1 id='success'>
        <div>required: {typeof this.props.requiredMomentDurationPrimitives}</div>
        <div>required: {typeof this.props.optionalMomentDurationPrimitives}</div>
      </h1>
    );
  }
}

setup();

describe('durationPrimitive', () => {

  describe('isRequired', () => {

    before(() => {
      MomentDurationPrimitives.propTypes = {
        requiredMomentDurationPrimitives: durationPrimitive.isRequired,
      };
    });

    describe('<MomentDurationPrimitives />', () => {
      it('Throws required message', () => {
        assertRenderFailure(() => shallow(<MomentDurationPrimitives />), (ex) => {
          expect(ex).to.be.an.instanceOf(TestUtilError);
          expect(ex.message).to.contain(messages.requiredCore);
        });
      });
    });

    describe('<MomentDurationPrimitives duration={null} />', () => {
      it('Throws required message', () => {
        const props = { requiredMomentDurationPrimitives: null };
        assertRenderFailure(() => shallow(<MomentDurationPrimitives {...props} />), (ex) => {
          expect(ex).to.be.an.instanceOf(TestUtilError);
          expect(ex.message).to.contain(messages.requiredCore);
        });
      });
    });

    // TODO: [Issue 26] passing when it shouldn't in Enzyme. Uncomment when fixed
    // describe('<MomentDurationPrimitives duration={undefined} />', () => {
    //   it('Throws required message', () => {
    //     const props = { requiredMomentDurationPrimitives: undefined };
    //     assertRenderFailure(() => mount(<MomentDurationPrimitives {...props} />), (ex) => {
    //       expect(ex).to.be.an.instanceOf(TestUtilError);
    //       expect(ex.message).to.contain(messages.requiredCore);
    //     });
    //   });
    // });

    describe('<MomentDurationPrimitives duration={Boolean} />', () => {
      it('Throws invalid type message', () => {
        const props = { requiredMomentDurationPrimitives: false };
        assertRenderFailure(() => shallow(<MomentDurationPrimitives {...props} />), (ex) => {
          expect(ex).to.be.an.instanceOf(Error);
          expect(ex.message).to.contain(messages.invalidTypeCore);
        });
      });
    });

    // TODO: Validation of duration parsing is very iffy right now and likely needs to change
    // TODO: see moment issue https://github.com/moment/moment/issues/1805
    // describe('<MomentDurationPrimitives duration={invalidDuration} />', () => {
    //   it('Throws invalid type message', () => {
    //     const props = { requiredMomentDurationPrimitives: [3,'mintues'] };
    //     assertRenderFailure(() => shallow(<MomentDurationPrimitives {...props} />), (ex) => {
    //       expect(ex).to.be.an.instanceOf(Error);
    //       expect(ex.message).to.contain(messages.baseInvalidMessage);
    //     });
    //   });
    // });

    describe('<MomentDurationPrimitives duration={durationPrimitive} />', () => {
      it('renders without error', () => {
        let props = { requiredMomentDurationPrimitives: 123 };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
        props = { requiredMomentDurationPrimitives: { seconds: 2 } };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
        props = { requiredMomentDurationPrimitives: [123, 'years'] };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
        props = { requiredMomentDurationPrimitives: '23:59:59' };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
      });
    });

  });

  describe('optional', () => {

    before(() => {
      MomentDurationPrimitives.propTypes = {
        requiredMomentDurationPrimitives: durationPrimitive,
      };
    });

    describe('<MomentDurationPrimitives />', () => {
      it('Throws required message', () => {
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives />), successIdKey);
      });
    });

    describe('<MomentDurationPrimitives duration={null} />', () => {
      it('Throws required message', () => {
        const props = { requiredMomentDurationPrimitives: null };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
      });
    });

    // TODO: Validation of duration parsing is very iffy right now and likely needs to change
    // TODO: see moment issue https://github.com/moment/moment/issues/1805
    // describe('<MomentDurationPrimitives duration={invalidDuration} />', () => {
    //   it('Throws invalid type message', () => {
    //     const props = { requiredMomentDurationPrimitives: [3,'mintues'] };
    //     assertRenderSuccess(
    //       () => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
    //   });
    // });

    describe('<MomentDurationPrimitives duration={durationPrimitive} />', () => {
      it('renders without error', () => {
        let props = { requiredMomentDurationPrimitives: 123 };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
        props = { requiredMomentDurationPrimitives: { seconds: 2 } };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
        props = { requiredMomentDurationPrimitives: [123, 'years'] };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
        props = { requiredMomentDurationPrimitives: '23:59:59' };
        assertRenderSuccess(() => shallow(<MomentDurationPrimitives {...props} />), successIdKey);
      });
    });

  });

});
