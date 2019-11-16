import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: 280
  }
}));
const CustomSlider = withStyles({
  root: {
    color: '#96a0fa',
    height: 2
  },
  thumb: {
    height: 25,
    width: 25,
    backgroundColor: '#1f2666',
    marginTop: -10,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  track: {
    height: 5,
    borderRadius: 3
  },
  rail: {
    height: 5,
    borderRadius: 3
  }
})(Slider);

function RoomSlider(props) {
  const classes = useStyles();
  const [, setValue] = React.useState(props.state);
  const updateLable = (event, newValue) => {
    setValue(newValue);
    props.updateLable(props.id, newValue);
  };
  const sendEvent = (e, newValue) => {
    props.notifyEvent({
      type: 'uiInput',
      time: Date.now(),
      data: {
        uiID: props.id,
        oldState: props.state,
        state: newValue,
        client: 'TODO'
      }
    });
  };
  return (
    <div className={classes.root}>
      <CustomSlider
        aria-label="Pretto slider"
        defaultValue={props.state}
        onChange={updateLable}
        onChangeCommitted={sendEvent}
        min={8}
        max={45}
      />
    </div>
  );
}
RoomSlider.propTypes = {
  notifyEvent: PropTypes.func,
  updateLable: PropTypes.func,
  id: PropTypes.string,
  state: PropTypes.number
};
export default RoomSlider;
