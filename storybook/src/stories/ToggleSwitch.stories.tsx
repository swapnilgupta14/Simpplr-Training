import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
    title: 'Components/ToggleSwitch',
    component: ToggleSwitch,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Toggle state',
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state',
        },
        onClick: {
            action: 'clicked',
            description: 'Triggered when toggle is clicked',
        },
        onLabel: {
            control: 'text',
            description: 'Label for On state',
        },
        offLabel: {
            control: 'text',
            description: 'Label for Off state',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

const ToggleSwitchWrapper = (props: React.ComponentProps<typeof ToggleSwitch> & { onClick?: (newState: boolean) => void }) => {
    const [internalChecked, setInternalChecked] = useState(props.checked || false);

    useEffect(() => {
        setInternalChecked(props.checked || false);
    }, [props.checked]);

    const handleClick = (newState: boolean) => {
        setInternalChecked(newState);
        props.onClick?.(newState);
    };

    return (
        <ToggleSwitch
            {...props}
            checked={internalChecked}
            onClick={handleClick}
        />
    );
};

export const Default: Story = {
    render: (args) => <ToggleSwitchWrapper {...args} />,
    args: {
        checked: false,
        disabled: false,
        onLabel: 'On',
        offLabel: 'Off',
    },
};

export const Checked: Story = {
    render: (args) => <ToggleSwitchWrapper {...args} />,
    args: {
        checked: true,
        disabled: false,
        onLabel: 'On',
        offLabel: 'Off',
    },
};

export const Disabled: Story = {
    render: (args) => <ToggleSwitchWrapper {...args} disabled={true} />,
    args: {
        checked: false,
        onLabel: 'On',
        offLabel: 'Off',
    },
};
