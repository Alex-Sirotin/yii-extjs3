/******************************************************************************/
Ext.ns('sav');
/******************************************************************************/
/* Грид сообщений (сверху)                                                    */
/******************************************************************************/
sav.issueGrid = Ext.extend(Ext.grid.GridPanel, {
//----------------------------------------------------------------------------//	
	store: new Ext.data.Store({
		// Запросы отправляются при изменении строк автоматически
		//autoSave: false, 
		id: 'issueStore',
//----------------------------------------------------------------------------//			
		// Запросы PHP
		proxy: new Ext.data.HttpProxy({
			api:{
				// Чтение из БД load, reload, refresh
				read: '/index.php/issue/data', 
				// Создание новой записи, insert
				create: '/index.php/issue/add',
				// Обновление записи, set
				update: '/index.php/issue/edit'
			}
		}),			
//----------------------------------------------------------------------------//	
		// Подготовка данных для передачи на сервер
		writer: new Ext.data.JsonWriter({
			encode: true,
			writeAllFields: false,
			listful: false
		}),	
//----------------------------------------------------------------------------//			
		// Читатель данных из PHP
		reader: new Ext.data.JsonReader({
			idProperty:'issue_id',
			successProperty:'success',
			root:'Issue',
			totalProperty:'total'
		},
		// Описание полей ридера
		[
		{
			name: 'issue_id', 
			type: 'int' ,
			mapping: 'issue_id'
		}, 
		{
			name: 'issue_subject', 
			type: 'string', 
			mapping: 'issue_subject'
		}, 

		{
			name: 'client_id', 
			type: 'int', 
			mapping: 'client_id'
		}, 

		{
			name: 'support_id', 
			type: 'int', 
			mapping: 'support_id'
		}, 

		{
			name: 'status_id', 
			type: 'int', 
			mapping: 'status_id'
		}, 
		{
			name: 'status_name', 
			type: 'string', 
			mapping: 'status_name'
		}, 		

		{
			name: 'issue_date', 
			type: 'date', 
			dateFormat:'Y-m-d H:i:s',
			mapping: 'issue_date'
		}, 

		{
			name: 'is_closed', 
			type: 'bool', 
			mapping: 'is_closed'
		}, 

		{
			name: 'close_date', 
			type: 'date', 
			dateFormat:'Y-m-d H:i:s',
			mapping: 'close_date'
		}, 

		{
			name: 'client_login', 
			type: 'string', 
			mapping: 'client_login'
		}, 

		{
			name: 'client_name', 
			type: 'string', 
			mapping: 'client_name'
		},

		{
			name: 'support_login', 
			type: 'string', 
			mapping: 'support_login'
		}, 

		{
			name: 'support_name', 
			type: 'string', 
			mapping: 'support_name'
		},
		
		{
			name: 'last_date', 
			type: 'date', 
			dateFormat:'Y-m-d H:i:s',
			mapping: 'last_date'
		},
		
		{
			name: 'msg_text', 
			type: 'string', 
			mapping: 'msg_text'
		}, 		
		{
			name: 'updateAction', 
			type: 'string', 
			mapping: 'updateAction'
		},
		
		{
			name: 'is_changed', 
			type: 'bool', 
			mapping: 'is_changed'
		}		
		
		]),		

		// Сортировка по последней дате сообщения
		sortInfo:{
			field:'last_date', 
			direction:'desc'
		}
	}),
//----------------------------------------------------------------------------//		
	// Струкутра колонок грида
	cm: new Ext.grid.ColumnModel([
	{
		header:'№',
		readonly:true,
		dataIndex:'issue_id', 
		width:25, 
		hidden:false		
	},
	
	{
		header: 'Дата создания', 
		hidden:false,
		dataIndex: 'issue_date',
		renderer: sav.utils.dateRu
	}, 	

	{
		header:'Тема',
		dataIndex:'issue_subject', 
		width:300, 
		hidden:false
	},
	
	{
		header: 'Клиент', 
		hidden:false, 
		dataIndex: 'client_name'
	},

	{
		header: 'Поддержка', 
		hidden:false, 
		dataIndex: 'support_name'
	},
	
	{
		header: 'Последнее сообщение', 
		hidden:false, 
		dataIndex: 'last_date',
		renderer: sav.utils.dateRu
	},
	
	{
		header: 'Статус', 
		hidden:false,
		dataIndex: 'status_name'
	}, 		
	{
		header: 'Дата закрытия', 
		hidden:false,
		dataIndex: 'close_date',
		renderer: sav.utils.dateRu
	}
	]),
//----------------------------------------------------------------------------//	
	// Создаем панельуправления темами
	buildToolbar: function(){
		
		// User может создать и закрыть тему
		if (sav.IS_USER){
			return [{
				text: 'Создать тему',
				id: 'btnAddIssue',
				scope: this
			},
			'-',
			{
				text: 'Закрыть тему',
				id: 'btnCloseIssue',
				scope: this
			},
			'-',			
			{
				text: 'На главную',
				id: 'btnExit',
				scope: this			
			},
			'-'];
		// Support можуть "подписаться" на тему
		}else if (sav.IS_SUPPORT){
			
			return [{
				text: 'Взять тему',
				id: 'btnOpenIssue',
				scope: this
			},
			'-',			
			{
				text: 'На главную',
				id: 'btnExit',
				scope: this			
			},
			'-'];			
		}else{
			
		}
	},
//----------------------------------------------------------------------------//		
	// Загрузка данных в грид
	load: function(){
		this.store.load();
	},
//----------------------------------------------------------------------------//		
	// Вставка новой темы
	insert: function(issueSubject, msgText){
		var rec;
		// Вставка только непустых значений
		if (issueSubject && msgText){
		
			// Сформировать поля для отправки
			rec = new this.store.recordType({
				// Тема
				issue_subject: issueSubject,
				// Текст сообщения
				msg_text: msgText
			});
			// Сохранение и отправка на сервер, на сервере дозаполняются данные
			this.store.insert(0, rec);
			// Обновляем грид с сервера
			this.refresh();			

		} else {
			Ext.Msg.alert('Пустые значения','Поля "Тема" и "Сообщение" должный быть заполнены!')
		}				
	},
	//----------------------------------------------------------------------------//	
	// Взять тему, для саппорта
	open: function(issue){
		// Сохранение и отправка данных на сервер, 
		// по updateAction будем знать что делать в PHP
		issue.set('updateAction', 'Open');
		// Обновляем грид с сервера
		this.refresh();
	},	
//----------------------------------------------------------------------------//		
	// Закрыть тему, общение закончилось
	close: function(issue){
		// Сохранение и отправка данных на сервер, 
		// по updateAction будем знать что делать в PHP
		issue.set('updateAction', 'Close');
		// Обновляем грид с сервера
		this.refresh();
	},		
//----------------------------------------------------------------------------//	
	// Перезагрузка данных в грид и сторе
	refresh: function(){
		this.store.reload();
	},
//----------------------------------------------------------------------------//		
	// Конструктор
	initComponent : function() {	
		this.tbar = this.buildToolbar();
		// Обновлять грид кажые 5 сек.
		setInterval(this.refresh.bind(this), 5000);
		sav.issueGrid.superclass.initComponent.call(this);		
	}
//----------------------------------------------------------------------------//	
});
/******************************************************************************/