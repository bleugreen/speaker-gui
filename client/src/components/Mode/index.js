import { Col, Collapse, Row, Typography, Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ColorBlock from '../Color';
import LayerBlock from '../Layer';
import LayerList from '../Home/layerlist';

//import './style.css';

const { Panel } = Collapse;
const { Title } = Typography;

function Mode ({mid, active, setActive}) {
  const [activeType, setActiveType] = useState("default");
  const [loading, setLoading] = useState("true");
  const [pid, setPidState] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    if(loading){
        init();

    } 
     if(mid == active){
          setActiveType("primary");
          console.log("id: "+mid+" active: "+active);
      }
      else{
        setActiveType("default");
        console.log("id: "+mid+" active: "+active);
      }

  }, [active]);

  const init = () => {
    axios.get('/api/mode', {
        params: {
            id: mid,
        }
    })
    .then(function (response) {
        setName(response.data.name);
        setPidState(response.data.palette);
        setLoading(false);
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }

  const notify = (field, value) => {
    if(mid == active){
        axios.request({
            url: '/api/active/update',
            method: 'post',
            data: {field, value}, 
          })
          .then(function (response) { console.log(response) })
          .catch(function (response) { console.log(response) });
    }
  }


  const callback = key => {
    //console.log(key);
  }

  const activeClick = () => {
    setActive(mid);
    setActiveType("primary");
  }

  const setPid = (pid) => {
      setPidState(pid);
      // /api/mode/update body.id=mid body.field="pid", body.value={pid}
      let data = {
        id: mid,
        field: "palette",  
        value: pid,
      }
      axios.request ({
        url: "/api/mode/update",
        method: 'post',
        data: data, 
        })
        .then(function (response) {
            notify(data.field, data.value)
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
  }

  if(!loading){
    return (
        <div>        
            
            {/* <Row>
                <Col span={18}>
                    <Title style={{textAlign:"left"}}>{name}</Title>
                </Col>
                <Col span={6} >
                    <Button type={activeType} size="large" onClick={activeClick} style={{float:"right"}}>
                        Active
                    </Button>
                </Col>
            </Row> */}
            <Row>
                <Col span={24}>
                    <Collapse
                        defaultActiveKey={['1']}
                        onChange={callback}
                        bordered={true}
                    >
                        <Panel
                            header="Color"
                            key="1"
                        >
                            <ColorBlock 
                                pid={pid}
                                active={active}
                                setPid={setPid}
                            />
                        </Panel>
                        <Panel
                            header="Pattern"
                            key="2"
                        >
                            Pattern Block
                        </Panel>
                        <Panel
                            header="Sound"
                            key="3"
                        >
                            Sound Block
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>

    );
    }  
    else{
        return <Spin />
    }
};

export default Mode;