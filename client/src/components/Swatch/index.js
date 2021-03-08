import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { Modal } from 'antd';

import './style.css';

class SwatchCircle extends React.Component {
  state = {
    visible: false,
    color: this.props.color,
  };

  handleClick = () => {
    this.setState({ visible: true });
  };

  handleClose = () => {
    this.setState({ visible: false }, this.props.onChange(this.props.index, this.state.color));
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
  };

  handleComplete = (color) => {
    this.setState({ color: color.hex });
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '80%',
          height: '36px',
          borderRadius: '15px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          background: this.state.color,
        },
        swatch: {
          padding: '5px',
          width: '100%',
          background: '#fff',
          display: 'inline-block',
          cursor: 'pointer',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        <Modal
          visible={this.state.visible}
          footer={null}
          onOk={this.handleClose}
          onCancel={this.handleClose}
          closable={false}
          width={'60%'}
        >
          <div className="picker">
          <SketchPicker   
            className="picker"
            color={ this.state.color } 
            onChange={ this.handleChange } 
            onChangeComplete= {this.handleComplete}
            disableAlpha={true}
            presetColors={[]}
            width={'100%'}
          />
          </div>
        </Modal>
      </div>
    )
  }
}

export default SwatchCircle 