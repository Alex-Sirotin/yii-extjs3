<?php

$this->widget('zii.widgets.CMenu', array(
	'items' => array(
		array('label' => 'Главная', 'url' => array('/site/index')),
		/* 				
		  array('label'=>'About', 'url'=>array('/site/page', 'view'=>'about')),
		  array('label'=>'Contact', 'url'=>array('/site/contact')),
		 */
		array('label' => 'Роли', 'url' => array('/role'), 'visible' => Yii::app()->user->getState(AUTH_CONST::IS_ADMIN, FALSE)),
		array('label' => 'Пользователи', 'url' => array('/user'), 'visible' => Yii::app()->user->getState(AUTH_CONST::IS_ADMIN, FALSE)),
		array('label' => 'Состояния', 'url' => array('/status'), 'visible' => Yii::app()->user->getState(AUTH_CONST::IS_ADMIN, FALSE)),
		array('label' => 'Поддержка', 'url' => array('/issue'), 'visible' => !Yii::app()->user->isGuest),
		array('label' => 'Сообщения', 'url' => array('/message'), 'visible' => Yii::app()->user->getState(AUTH_CONST::IS_ADMIN, FALSE)),
		array('label' => 'Вход', 'url' => array('/site/login'), 'visible' => Yii::app()->user->isGuest),
		array('label' => 'Выход (' . Yii::app()->user->getState(AUTH_CONST::TITLE_NAME, Yii::app()->user->name) . ')', 'url' => array('/site/logout'), 'visible' => !Yii::app()->user->isGuest),
		)));
?>