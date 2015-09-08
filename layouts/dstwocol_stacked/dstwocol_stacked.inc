<?php

// Plugin definition
$plugin = array(
  'title' => t('DataServ Two column stacked'),
  'category' => t('Columns: 2'),
  'icon' => 'dstwocol_stacked.png',
  'theme' => 'ds_twocol_stacked',
  'css' => 'dstwocol_stacked.css',
  'regions' => array(
    'top' => t('Top'),
    'left' => t('Left side'),
    'right' => t('Right side'),
    'bottom' => t('Bottom')
  ),
);
