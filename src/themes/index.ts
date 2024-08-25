import light, { Theme } from './light'
import dark from './dark'
import nord from './nord'

export type ThemeNames = "light" | "dark" | "nord"

export interface ThemeMeta {
    id: ThemeNames
    name: string
    theme: Theme
}

export const themes: readonly ThemeMeta[] = [
    {
        id: "light",
        name: "Claro",
        theme: light
    },
    {
        id: "dark",
        name: "Escuro",
        theme: dark
    },
    {
        id: "nord",
        name: "Nord",
        theme: nord
    }
]

export type { Theme }