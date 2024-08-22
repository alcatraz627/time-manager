import {
    DataObject,
    FormatAlignJustify,
    FormatIndentIncrease,
    Settings,
} from "@mui/icons-material";

export type RouteScope = "guest" | "user" | "admin";

export interface AppLinkItem {
    title: string;
    href: string;
    icon?: JSX.Element;
    scope: RouteScope;
    disabled?: true;
}

/**
 * Categories
 * - app ?
 * - admin
 * - user
 * - lab
 */

export const AppLinks: AppLinkItem[] = [
    {
        icon: <DataObject />,
        title: "Browse Links",
        href: "/links",
        scope: "user",
    },
    {
        icon: <DataObject />,
        title: "Table Entity",
        href: "/admin/entity",
        scope: "admin",
    },
    {
        icon: <FormatAlignJustify />,
        title: "Logs",
        href: "/admin/logs",
        scope: "admin",
    },
    {
        icon: <Settings />,
        title: "Preferences",
        href: "/user/preferences",
        scope: "user",
        disabled: true,
    },
    {
        icon: <FormatIndentIncrease />,
        title: "Editor",
        href: "/lab/editor",
        scope: "guest",
    },
];
