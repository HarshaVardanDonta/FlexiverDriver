import React from 'react';
import './VehicleComp.css';
import { Typography } from 'antd';

interface VehicleCompProps {
    vehicleName: string;
    vehicleImage: string;
    vehicleDescription: string;
    onClick: () => void;
    selected: boolean;
}

export default function VehicleComp(props: VehicleCompProps) {
    return (
        <div className={props.selected === true ? 'vehicleContainerSelected' : 'vehicleContainer'} onClick={() => {
            props.onClick();
        }
        }>
            <div className='vehicleImageContainer'>
                <img src={props.vehicleImage} alt='logo' className='vehicleLogo' />
            </div>
            <div className={props.selected? 'vehicleTextSelectedContainer': 'vehicleTextContainer'}>
                <Typography.Text style={{
                    color: props.selected ? 'white' : 'black'
                }}>
                    {props.vehicleName}
                </Typography.Text>
                <div className='extraVehicleTextReveal'>
                    <Typography.Text style={{
                    color: props.selected ? 'white' : 'black'
                }}>
                        {props.vehicleDescription}
                    </Typography.Text>
                </div>
            </div>
        </div>
    );
}