<?php if (isset($this->breadcrumbs)): ?>
	<?php
	$this->widget('zii.widgets.CBreadcrumbs', array(
		'links' => $this->breadcrumbs,
		//'homeLink' => array('Главная' => array('site/index')),
		'homeLink' => CHtml::link('Главная', '/'),
		'separator' => ' &rarr; '
	));
	?><!-- breadcrumbs -->
	<?php
 endif ?>