'use strict'

/*
|--------------------------------------------------------------------------
| Routes
  Existen 2 grupos de rutas: Las que necesitan autenticación del usuario y las que no. TOMAR MUY EN CUENTA ESTO
  Dentro del grupo de las que necesitan autenticación se debe especificar el middleware para verificar si el
  usuario(autenticado) tiene el permiso para acceder a esa ruta. Ejemplo: .middleware('verifyPermission:1')
  El número 1 indica el permiso que debe tener para acceder a esa ruta
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");
  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.get("categoria", "CategoriaController.index")
    Route.post("login", "UserController.login");
    Route.post("register", "UserController.register")
    Route.get("validate_email/:email", "UserController.validateEmail")

    Route.get("plans", "PlanController.index")
    Route.get('productos_img/:file', 'UploadController.getFileByDirectoryProductos')
    Route.get('necesidad_img/:file', 'UploadController.getFileByDirectoryNecesidad')
    Route.get('perfil_img/:file', 'UploadController.getFileByDirectoryPerfil')
    Route.get('tienda_img/:file', 'UploadController.getFileByDirectoryTienda')
    Route.get("test_file/:file", "UploadController.testFile")
    Route.get('countries', 'CountryController.index')
    Route.get('cityByCountry/:id', 'CityController.cityByCountry')
  })
);

addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas con protección de autenticación aquí


    Route.post('producto', 'UploadController.registrarProducto')
    Route.put('producto/:id', 'ProductoController.update')
    Route.get('producto_by_proveedor/:proveedor_id', 'ProductoController.productoByProveedor')
    Route.get("opiniones2/:proveedor_id", "OpinionController.todos")
    Route.get('calificacion_by_proveedor/:proveedor_id', 'OpinionController.index2')
    Route.get('calificacion_by_cliente/:cliente_id', 'OpinionController.index3')
    Route.delete('producto/:id', 'ProductoController.destroy')
    Route.get('producto', 'ProductoController.index')
    Route.get('producto/:id', 'ProductoController.show')
    Route.get('producto_filtrado/:filtrar', 'ProductoController.productoFiltrado')

    Route.post('necesidad', 'NecesidadController.store')
    Route.get('necesidad', 'NecesidadController.necesidadByAll')
    Route.get('necesidades', 'NecesidadController.necesidades')
    Route.get('necesidad_by_user_id/:user_id', 'NecesidadController.necesidadByUserId')
    Route.get('necesidad_by_prov_id/:prov_id', 'NecesidadController.necesidadByProveedorId')
    Route.get('necesidad_by_categoria_id/:categoria_id', 'NecesidadController.necesidadByCategoriaId')
    Route.get('necesidad/:id', 'NecesidadController.show')
    Route.put('necesidad/:id', 'NecesidadController.update')
    Route.put('necesidadestatus/:id/:status', 'NecesidadController.cambioestado')
    Route.delete('necesidad/:id', 'NecesidadController.destroy')

    Route.get("user_info", "UserController.userInfo") // metodo para obtener informacion del usuario que esta logueado
    Route.get("all_user", "UserController.allUser") // metodo para obtener informacion del usuario que esta logueado
    Route.post("filtrar_talleres", "UserController.filtrarTalleres")
    Route.get("user_by_id/:id", "UserController.userById") // metodo para obtener informacion del usuario por id del mismo
    Route.post("user_by_rol", "UserController.userByRol") // metodo para obtener usuarios segun el rol
    Route.post("user_enable/:id", "UserController.userEnable") // metodo para bloquear o desbloquear usuarios
    Route.post("user_by_status", "UserController.userByStatus") // metodo para obtener proveedores pendientes
    Route.put("update_status/:id", "UserController.userStatus") // metodo para bloquear o desbloquear usuarios
    Route.put('datosnew/:id', 'UserController.updatedata')
    Route.put('editar_perfil/:id', 'UserController.editarPerfil')


    Route.post("crear_chat/:id_cotisation", "ChatController.storeChat")
    Route.delete('chat/:id', 'ChatController.destroy')
    Route.put("cotizar_necesidad/:id_cotisation", "ChatController.updateCotization")
    Route.get("show_all_cotizations", "ChatController.showAllCotizations")
    Route.get("show_all_cotizations2", "ChatController.showAllCotizations2")
    Route.get('cotization_by_id/:id_cotisation', 'ChatController.cotizationById')
    Route.put("new_status/:id_cotisation", "ChatController.updateStatus")
    Route.put("fecha_de_termino/:id_cotisation", "ChatController.updateFechaTermino")
    Route.post("opinion/:id/:quien/:chat_message_id", "OpinionController.store")
    Route.get("opiniones/:necesidad_id", "OpinionController.index")
    Route.get("mas_populares", "OpinionController.masPopulares") // metodo para obtener las tiendas mejor calificadas
    
    Route.post("new_favorito/:id_proveedor", "FavoritoController.create")
    Route.post("favorito/:id_proveedor", "FavoritoController.index")
    Route.get("mis_favoritos", "FavoritoController.show")
    Route.post("subir_archivo_necesidad/:id" ,'UploadController.subirimgnecesidad')
    Route.post("subir_archivo_proveedor" ,'UploadController.subirimgtienda')
    Route.post("subir_archivo_proveedor/:user_id" ,'UploadController.subirimgtiendaById')
    Route.get("eliminar_imagen_tienda/:id" ,'UploadController.eliminarigmtienda')
    Route.get("eliminar_imagen_tienda/:id/:user_id" ,'UploadController.eliminarigmtiendaById')
    Route.post('perfil_imagen', 'UploadController.newimagen')
    Route.post('perfil_imagen/:user_id', 'UploadController.newimagenById')
    
    Route.post('quotation', 'QuotationController.store')
    Route.get('isNewMessages/:id', 'QuotationController.isNewMessages')
    Route.get("show_all_chats", "QuotationController.showAllChats")
    Route.get("show_all_messages/:id", "QuotationController.showAllMessages")
    Route.post("send_message/:id", "QuotationController.sendMessage") // metod para enviar un mensaje
    Route.put("updateQuotation/:id", "QuotationController.updateQuotation")
    Route.get("show_all_cotizations3", "QuotationController.showAllCotizations3")
    Route.put("messageSeen/:id", "QuotationController.messageSeen")
    Route.put("quotationActive/:id", "QuotationController.quotationActive")
    Route.put("quotationExtend/:id", "QuotationController.quotationExtend")
    
    
    
    
  }).middleware("auth")
  );
  