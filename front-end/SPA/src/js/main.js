var cart = [];

function addProductCart(value) {
  
  var qtd  = cart.push(value); // add cada produto clicado no array
  var soma = 0;

  for(var i = 0; i < cart.length; i++) {
    
    soma += parseFloat(cart[i]);
    
  }

  if (qtd > 1) {
    $('#qtd').text(qtd + ' Itens');
  } else {
    $('#qtd').text(qtd + ' Item');
  }    

  $('#total').text('Total: R$ '+soma.toFixed(2).replace(".", ","));
  
}

function loadProducts() {
  
  $.getJSON('assets/data/products.json').done(function(data) {

    var msg = '';
    
    $.each(data, function(key, val) {

      var id    = key;
      var imgs  = val.images;
      var name  = val.name;
      var value = val.Value.toFixed(2).replace(".", ",");
      
      msg += '<div class="spa-product">';
        $.each(imgs, function(key, result) {
          msg +=  '<img src="'+result.imageUrl+'" alt="'+name+'" class="spa-product__thumb">'; 
        })
        msg += '<div class="spa-product__legend">';
          msg +=  '<h3 class="spa-product__name">'+name+'</h3>';       
          msg +=  '<span class="spa-product__value">R$ '+value+'</span>'; 
        msg += '</div>';
        msg += '<button class="spa-product__buy add" data-id="btn-'+id+'" data-value="'+val.Value+'">Comprar</button>';
      msg +='</div>';
      
      $('#products').html(msg);

      $('.add').on('click', function(e) {
          e.preventDefault();

          var produtc_value = $(this).attr('data-value');

          addProductCart(produtc_value);
        });
      
    });

  }).fail(function(){

    $('#products').text('Desculpas, os produtos estão indiponíveis no momento!');

  }).always(function(){})
} loadProducts();

function showTotal() {
  
  $('.spa-component-cart__box').hover(function() {
    if(!$(this).find('#total').text() == '') {
      $(this).find('#total').slideToggle(100);  
    }
  });

} showTotal();