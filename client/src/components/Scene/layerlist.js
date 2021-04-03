import { useState } from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
import Reorder, {
    reorder,
    reorderImmutable,
    reorderFromTo,
    reorderFromToImmutable
  } from 'react-reorder';

import Layer from '../Layer';

import './style.css';
import Text from 'antd/lib/typography/Text';

  function LayerList({sid, layers, setLayers, notify, onDeleteLayer}){
    const [plist, setPlist] = useState([]); 
    const [expanded, setExpanded] = useState(-1);
    
    const onReorder = (event, previousIndex, nextIndex, fromId, toId) =>{
        setPlist( reorder(plist, previousIndex, nextIndex) );
    };

    const handleExpand = (id) => {
      if(expanded == id){
        setExpanded(-1);
      }
      else{
        setExpanded(id);
      }
      // console.log(e.currentTarget.id);
    }

    const listDeleteLayer = (lid) => {
      setExpanded(-1);
      onDeleteLayer(lid);
    }

    const placeholder = <Collapse><Panel></Panel></Collapse>
    if(layers.length > 0){
    return(
        <Reorder
        reorderId="my-list" // Unique ID that is used internally to track this list (required)
        reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
        //getRef={this.storeRef.bind(this)} // Function that is passed a reference to the root node when mounted (optional)
        placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
        draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
        lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
        holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
        touchHoldTime={300} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
        mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
        onReorder={setLayers} // Callback when an item is dropped (you will need this to update your state)
        autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
        disabled={(expanded != -1)} // Disable reordering (optional), defaults to false
        disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
      >
        {
          layers.map((item) => (
            <li key={item} id={item}>
            <Layer 
              sid={sid} 
              lid={item} 
              expanded={expanded} 
              onExpand={handleExpand}
              onDeleteLayer={listDeleteLayer}
            />
            </li>
          ))
        }
      </Reorder>
      )
    }
    else{
      return <Text>No Layers</Text>
    }
  }

  export default LayerList;