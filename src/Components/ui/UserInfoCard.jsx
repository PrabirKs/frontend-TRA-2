import React, { useContext } from 'react';
import { Row, Col, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Context } from '../../Context/AppProvider';

const UserInfo = ({  userEmail }) => {
    const data = useContext(Context)
  return (
    <Row justify={data.isCollapsed?'center':'start' } align="middle" className={`flex items-center   gap-x-2 mt-6 ${data.isCollapsed?'':'ml-4'}`}>
      <Col flex="0 0 auto">
        <Avatar size={30} icon={<UserOutlined color='blue' />}   />
      </Col>
      {
        data.isCollapsed ===false && (
        <div className="ml-1  flex flex-col items-start justify-center">
          <Typography.Text strong style={{color:"white"}} >{userEmail}</Typography.Text>
        </div>
      ) 
      }
    </Row>
  );
};

export default UserInfo;
