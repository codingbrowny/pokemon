import { useTheme } from '@/hooks/theme-context';
import React, { FC } from 'react'

interface ButtonProps {
    color?: string;
    size?: "small" | "large";
  active?: boolean,
  onClick?: () => void
}
interface OverlayProps {
  show: boolean;
  onThemeClick: ()=>void
}

export const ThemeOverlay: FC<OverlayProps> = ({ ...props }) => {

  const {changeTheme} = useTheme()
  
  const handleChangeTheme = (theme:any) => {
    changeTheme(theme)
    props.onThemeClick()
  }
  
  return (
    <div
      className={`w-full h-screen bg-black bg-opacity-20 backdrop-blur-sm flex-col justify-center items-center z-50 absolute top-0 left-0 ${
        props.show ? "scale-up flex" : "scale-down hidden"
      }`}
    >
      <div className="rounded-xl w-60 bg-[#EEEEEE]">
        <div className="bg-white p-5 rounded-t-xl"></div>
        <div className="flex items-center justify-between py-10 px-5">
          <ThemeButton onClick={()=>handleChangeTheme('theme1')} size="large" color='bg-coral' />
          <ThemeButton onClick={()=>handleChangeTheme('theme2')} size="large" color="bg-skyBlue" />
          <ThemeButton onClick={()=>handleChangeTheme('theme3')} size="large" color="bg-midYellow" />
        </div>
      </div>
    </div>
  );
}

export const ThemeButton:FC<ButtonProps> = ({size="small", active = false, ...props}) => {
    return (
      <button
        onClick={props.onClick}
        type="button"
        className={`block rounded-full box-border border m-0.5 p-2 transition-all duration-200 active:scale-95 ${
          size === "large" ? "w-14 h-14" : "w-11 h-11"
        } ${active? 'border-gray-700': 'border-transparent'} ${props.color?props.color: 'bg-primary'}`}
      ></button>
    );
}

const components = {
    ThemeButton,
    ThemeOverlay
}

export default components