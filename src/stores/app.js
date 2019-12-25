// @ts-check
import { createStore } from 'pinia'

export const useApp = createStore('app', () => ({
  theme: 'light'
}))

export const toggleTheme = () => {
    const app = useApp();
    if(app.state.theme === 'light'){
        app.state.theme = 'dark'
    }else{
        app.state.theme = 'light'
    }
}