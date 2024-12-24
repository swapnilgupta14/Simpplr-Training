import React, { CSSProperties, PropsWithChildren } from 'react';

interface ToggleSwitchProps extends PropsWithChildren {
    checked?: boolean;
    onClick?: (checked: boolean) => void;
    disabled?: boolean;
    onLabel?: string;
    offLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked = false,
    onClick,
    disabled = false,
    onLabel = "On",
    offLabel = "Off",
    children,
}) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick(!checked);
        }
    };

    const switchStyles: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    };

    const buttonStyles: CSSProperties = {
        position: 'relative',
        display: 'inline-flex',
        width: '60px',
        height: '30px',
        borderRadius: '15px',
        backgroundColor: disabled ? '#d1d5db' : checked ? '#38b2ac' : '#e5e7eb',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        padding: 0,
    };

    const toggleCircleStyles: CSSProperties = {
        position: 'absolute',
        top: '3px',
        left: checked ? '33px' : '3px',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    };

    const labelStyles: CSSProperties = {
        fontSize: '14px',
        fontWeight: '500',
        color: disabled ? '#9ca3af' : '#000',
    };

    return (
        <div style={switchStyles}>
            <span style={labelStyles}>{checked ? onLabel : offLabel}</span>
            <button
                onClick={handleClick}
                disabled={disabled}
                style={buttonStyles}
            >
                <span style={toggleCircleStyles} />
            </button>
            {children}
        </div>
    );
};

export default ToggleSwitch;
