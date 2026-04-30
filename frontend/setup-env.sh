#!/usr/bin/env bash
doppler secrets substitute .env.tpl > .env
doppler secrets substitute .env.local.tpl > .env.local