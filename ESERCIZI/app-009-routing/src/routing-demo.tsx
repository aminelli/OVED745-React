import DemoHeading from './DemoHeading'

import { useEffect, useState, type MouseEvent } from 'react'

import {
  createBrowserRouter,
  isRouteErrorResponse,
  Link as ReactRouterLink,
  type LoaderFunctionArgs,
  Outlet,
  RouterProvider,
  useLoaderData,
  useRouteError,
  useSearchParams,
} from 'react-router-dom'

import {
  createRootRoute,
  createRoute,
  createRouter,
  Link as TanStackLink,
  Outlet as TanStackOutlet,
  RouterProvider as TanStackRouterProvider,
} from '@tanstack/react-router'

import {
     Link as WouterLink, 
     Route, 
     Router, 
     Switch, 
     useSearchParams as useWouterSearchParams 
} from 'wouter'



