<?php
/* @var $this SiteController */

$this->pageTitle=Yii::app()->name;
?>

<h1>Тестовое задание</h1>

<p>
Цель задания: получить представление о том, как Вы решаете задачи, как
подходите к решению задачи, какие методы решения задачи выбираете,
как оформляете результат, как презентуете результат
</p>

<p>
<span style='font-weight: bold'>Инструментарий:</span> ExtJS 3.4.0, PHP 5.x, MySQL 5.x
</p>

<p>
<span style='font-weight: bold'>Задача:</span> создание системы для обработки заявок support.
</p>


<h3>Требования по решению задачи:</h3>
<ul>
<li>Все должно работать без перезагрузки страницы через ExtJS (RIA)</li>
<li>В системе есть две роли - саппортер и юзер, которому надо помочь
(аутентификацию можно не заворачивать сильно сложную, можно жестко прописать логины и пароли в файле или сделать
аутентификацию просто через разные ссылки входа в систему)</li>
<li>Юзер пишет проблему и она попадает к первому попавшемуся саппортеру онлайн, там
идет диалог между саппортом и юзером, который заканчивается тем, что кто-то завершает диалог.</li>
<li>Если свободного саппорт человека нет, то юзеру выводится сообщение, что надо подождать, а потом
автоматом подключает к разговору с саппортом</li>
<li>Все даные завернуть на базу данных</li>
<li>Нужно реализовать задачу минимумом кода с максимальным качеством кода.</li>
<li>Код должен иметь определенную структуру, облегчающую понимание</li>
<li>Код должен быть оформлен по любому стилю кодирования PHP/JS (отсутствие стиля - не есть стиль)</li>
</ul>

<h3>Результат:</h3>
<ul>
<li>архив с инструкцией</li>
<li>как запускать (run case)</li>
<li>без файлов, которые не имеют отношения к заданию</li>
<li>без файлов ExtJS library</li>
<li>как проверять (demo case)</li>
</ul>

<!--
<h1>Welcome to <i><?php echo CHtml::encode(Yii::app()->name); ?></i></h1>

<p>Congratulations! You have successfully created your Yii application.</p>

<p>You may change the content of this page by modifying the following two files:</p>
<ul>
	<li>View file: <code><?php echo __FILE__; ?></code></li>
	<li>Layout file: <code><?php echo $this->getLayoutFile('main'); ?></code></li>
</ul>

<p>For more details on how to further develop this application, please read
the <a href="http://www.yiiframework.com/doc/">documentation</a>.
Feel free to ask in the <a href="http://www.yiiframework.com/forum/">forum</a>,
should you have any questions.</p>
-->