import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';

import './style.css';

class SwatchCircle extends React.Component {
  state = {
    visible: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    console.log("swatch clicked");
    this.setState({ visible: true });
  };

  handleClose = () => {
    this.setState({ visible: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  handleComplete = (color) => {
    console.log("change complete");
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '36px',
          borderRadius: '15px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          display: 'inline-block',
          cursor: 'pointer',
        },

        modal: {
          width: '200px',
        }
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