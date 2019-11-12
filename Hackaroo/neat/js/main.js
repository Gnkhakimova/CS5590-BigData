
;(function () {
	
	'use strict';
	//import swal from 'sweetalert';
	var item_id1="";
	var item_id2="";
	var item_id3="";
	var item_id4="";
	var item_id5="";
	var item_id6="";

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};
	

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var sliderMain = function() {
		
	  	$('#fh5co-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};
//FEEDKC
	$(document).ready(function(){




		$('#validatelogin').click(function(){
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			if(username.length == 0){
				$("#invalid_username").show();
			}
			if(password.length==0){
				$("#invalid_password").show();
			}
            if(username.length > 0 && password.length > 0) {
				//API call
				// Create a request variable and assign a new XMLHttpRequest object to it.
				var request = new XMLHttpRequest()

				// Open a new connection, using the GET request on the URL endpoint
				request.open('GET', 'http://localhost:8081/username?username=' + username, true)

				request.onload = function () {
					// Begin accessing JSON data here
					// Begin accessing JSON data here
					var data = JSON.parse(this.response)
					data.forEach(user => {
						if (user.password != password) {
							$("#login_failed").show();
						}
						else{
							if(user.is_donor == false) {
								window.location.href = "receiverhome.html?username="+username
							}
							else{
								window.location.href="donorhome.html?username="+username
							}
						}
					})
				}
				// Send request
				request.send()
			}
		});

     if(location.href.toString().includes("donorhome.html")){

		 var url = new URL(location.href.toString());
     	 var query_string = url.search;
         var name=""
		 var search_params = new URLSearchParams(query_string);
         var username = search_params.get('username');
         var request = new XMLHttpRequest()

         document.getElementById('hidden_username_donor_home').value = username
		 document.getElementById("donate_menu_btn").href="donate.html?username="+document.getElementById('hidden_username_donor_home').value;
		 // Open a new connection, using the GET request on the URL endpoint
		 request.open('GET', 'http://localhost:8081/username?username=' + username, true)

		 request.onload = function () {
			 // Begin accessing JSON data here
			 // Begin accessing JSON data here
			 var data = JSON.parse(this.response)
			 data.forEach(user => {
				 name = user.firstname

				 document.getElementById("donor_greet").innerHTML="Hi "+name+"!"
			 })
		 }
		 // Send request
		 request.send()

     }

		if(location.href.toString().includes("donorhome.html")){
			var url = new URL(location.href.toString());
			var query_string = url.search;
			var id=""
			var search_params = new URLSearchParams(query_string);
			var username = search_params.get('username');
			var request = new XMLHttpRequest()
			var counter = 0;
			request.open('GET', 'http://localhost:8081/getitembyuserid?id=' + username, true)

			request.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				data.forEach(item => {
                counter = counter + 1;

                if(counter == 1) {
					$("#div1").show();
					document.getElementById("date1").innerHTML = item.donate_date;
					//item_name1
					document.getElementById("item_name1").innerHTML = item.item_type.toString().toUpperCase();
					//item_address
					document.getElementById("item_address1").innerHTML = item.donate_address;
					//item_quantity6
					document.getElementById("item_quantity1").innerHTML = item.donate_quantity;
					//style="background-image: url(images/blog-1.jpg);"
					document.getElementById("item_image1").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
				}
					if(counter == 2) {
						$("#div2").show();
						document.getElementById("date2").innerHTML = item.donate_date;
						document.getElementById("item_name2").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("item_address2").innerHTML = item.donate_address;
						document.getElementById("item_quantity2").innerHTML = item.donate_quantity;
						document.getElementById("item_image2").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 3) {
						$("#div3").show();
						document.getElementById("date3").innerHTML = item.donate_date;
						document.getElementById("item_name3").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("item_address3").innerHTML = item.donate_address;
						document.getElementById("item_quantity3").innerHTML = item.donate_quantity;
						document.getElementById("item_image3").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 4) {
						$("#div6").show();
						document.getElementById("date4").innerHTML = item.donate_date;
						document.getElementById("item_name4").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("item_address4").innerHTML = item.donate_address;
						document.getElementById("item_quantity4").innerHTML = item.donate_quantity;
						document.getElementById("item_image4").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 5) {
						$("#div6").show();
						document.getElementById("date5").innerHTML = item.donate_date;
						document.getElementById("item_name5").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("item_address5").innerHTML = item.donate_address;
						document.getElementById("item_quantity5").innerHTML = item.donate_quantity;
						document.getElementById("item_image5").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 6) {
						$("#div6").show();
						document.getElementById("date6").innerHTML = item.donate_date;
						document.getElementById("item_name6").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("item_address6").innerHTML = item.donate_address;
						document.getElementById("item_quantity6").innerHTML = item.donate_quantity;
						document.getElementById("item_image6").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}



				})
			}
			// Send request
			request.send()


		}

		if(location.href.toString().includes("receiverhome.html")){
			var url = new URL(location.href.toString());
			var query_string = url.search;
			var id=""
			var search_params = new URLSearchParams(query_string);
			var username = search_params.get('username');
			var request = new XMLHttpRequest()
			var counter = 0;

			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', 'http://localhost:8081/username?username=' + username, true)

			request.onload = function () {
				// Begin accessing JSON data here
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				data.forEach(user => {
					name = user.firstname

					document.getElementById("receiver_greet").innerHTML="Hi "+name+"!"
				})
			}
			// Send request
			request.send();

			var request = new XMLHttpRequest()
			document.getElementById("cart_nav").href = "cart.html?username="+username;
			request.open('GET', 'http://localhost:8081/availableitems', true)

			request.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				data.forEach(item => {
					counter = counter + 1;

					if(counter == 1) {
						$("#r_div1").show();
						item_id1 = item._id;
						document.getElementById("r_date1").innerHTML = item.donate_date;
						//item_name1
						document.getElementById("r_item_name1").innerHTML = item.item_type.toString().toUpperCase();
						//item_address
						document.getElementById("r_item_address1").innerHTML = item.donate_address;
						//item_quantity6
						document.getElementById("r_item_quantity1").innerHTML = item.donate_quantity;
						//style="background-image: url(images/blog-1.jpg);"
						document.getElementById("r_item_image1").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 2) {
						$("#r_div2").show();
						item_id2 = item._id;
						document.getElementById("r_date2").innerHTML = item.donate_date;
						document.getElementById("r_item_name2").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("r_item_address2").innerHTML = item.donate_address;
						document.getElementById("r_item_quantity2").innerHTML = item.donate_quantity;
						document.getElementById("r_item_image2").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 3) {
						$("#r_div3").show();
						item_id3 = item._id;
						document.getElementById("r_date3").innerHTML = item.donate_date;
						document.getElementById("r_item_name3").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("r_item_address3").innerHTML = item.donate_address;
						document.getElementById("r_item_quantity3").innerHTML = item.donate_quantity;
						document.getElementById("r_item_image3").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 4) {
						$("#r_div4").show();
						item_id4 = item._id;
						document.getElementById("r_date4").innerHTML = item.donate_date;
						document.getElementById("r_item_name4").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("r_item_address4").innerHTML = item.donate_address;
						document.getElementById("r_item_quantity4").innerHTML = item.donate_quantity;
						document.getElementById("r_item_image4").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 5) {
						$("#r_div5").show();
						item_id5 = item._id;
						document.getElementById("r_date5").innerHTML = item.donate_date;
						document.getElementById("r_item_name5").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("r_item_address5").innerHTML = item.donate_address;
						document.getElementById("r_item_quantity5").innerHTML = item.donate_quantity;
						document.getElementById("r_item_image5").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 6) {
						$("#r_div6").show();
						item_id6 = item._id;
						document.getElementById("r_date6").innerHTML = item.donate_date;
						document.getElementById("r_item_name6").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("r_item_address6").innerHTML = item.donate_address;
						document.getElementById("r_item_quantity6").innerHTML = item.donate_quantity;
						document.getElementById("r_item_image6").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}


				})
			}
			// Send request
			request.send()


		}
		//donate_menu_btn_main
		if(location.href.toString().includes("donate.html")){
			var url = new URL(location.href.toString());
			var query_string = url.search;
			var id=""
			var search_params = new URLSearchParams(query_string);
			var username = search_params.get('username');
			document.getElementById("donate_menu_btn_main").href = "donorhome.html?username="+username
		}
		if(location.href.toString().includes("cart.html")){
			var url = new URL(location.href.toString());
			var query_string = url.search;
			var id=""
			var search_params = new URLSearchParams(query_string);
			var username = search_params.get('username');
			var request = new XMLHttpRequest()
			var counter = 0;

			request.open('GET', 'http://localhost:8081/cart?userid='+username, true)

			request.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				data.forEach(item => {
					counter = counter + 1;

					if(counter == 1) {
						$("#c_div1").show();
						item_id1 = item._id;
						document.getElementById("c_date1").innerHTML = item.donate_date;
						//item_name1
						document.getElementById("c_item_name1").innerHTML = item.item_type.toString().toUpperCase();
						//item_address
						document.getElementById("c_item_address1").innerHTML = item.donate_address;
						//item_quantity6
						document.getElementById("c_item_quantity1").innerHTML = item.donate_quantity;
						//style="background-image: url(images/blog-1.jpg);"
						document.getElementById("c_item_image1").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 2) {
						$("#c_div2").show();
						item_id2 = item._id;
						document.getElementById("c_date2").innerHTML = item.donate_date;
						document.getElementById("c_item_name2").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("c_item_address2").innerHTML = item.donate_address;
						document.getElementById("c_item_quantity2").innerHTML = item.donate_quantity;
						document.getElementById("c_item_image2").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 3) {
						$("#c_div3").show();
						item_id3 = item._id;
						document.getElementById("c_date3").innerHTML = item.donate_date;
						document.getElementById("c_item_name3").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("c_item_address3").innerHTML = item.donate_address;
						document.getElementById("c_item_quantity3").innerHTML = item.donate_quantity;
						document.getElementById("c_item_image3").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 4) {
						$("#c_div4").show();
						item_id4 = item._id;
						document.getElementById("c_date4").innerHTML = item.donate_date;
						document.getElementById("c_item_name4").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("c_item_address4").innerHTML = item.donate_address;
						document.getElementById("c_item_quantity4").innerHTML = item.donate_quantity;
						document.getElementById("c_item_image4").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 5) {
						$("#c_div5").show();
						item_id5 = item._id;
						document.getElementById("c_date5").innerHTML = item.donate_date;
						document.getElementById("c_item_name5").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("c_item_address5").innerHTML = item.donate_address;
						document.getElementById("c_item_quantity5").innerHTML = item.donate_quantity;
						document.getElementById("c_item_image5").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}
					if(counter == 6) {
						$("#c_div6").show();
						item_id6 = item._id;
						document.getElementById("c_date6").innerHTML = item.donate_date;
						document.getElementById("c_item_name6").innerHTML = item.item_type.toString().toUpperCase();
						document.getElementById("c_item_address6").innerHTML = item.donate_address;
						document.getElementById("c_item_quantity6").innerHTML = item.donate_quantity;
						document.getElementById("c_item_image6").style.backgroundImage = "url(images/"+item.item_type+".jpg)";
					}


				})
			}
			// Send request
			request.send()


		}
		if(location.href.toString().includes("history.html")){
			var url = new URL(location.href.toString());
			var query_string = url.search;
			var id=""
			var search_params = new URLSearchParams(query_string);
			var username = search_params.get('username');
			var request = new XMLHttpRequest()
			var counter = 0;
            var tbl = document.getElementById("tbl_history");
			request.open('GET', 'http://localhost:8081/getorders?userid='+username, true)

			request.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				data.forEach(item => {

				})
			}
			// Send request
			request.send()


		}
	});

	$(document).ready(function() {
///// REGISTER
		$('#btn_add_to_cart1').on("click",function(){
			var url = new URL(location.href.toString());
			var query_string = url.search;
			var search_params = new URLSearchParams(query_string);
			var username = search_params.get('username');

			var data = {
				item_id: item_id1,
				receiver_user_id: username
			};

			var json = JSON.stringify(data);
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://localhost:8081/addtocart");
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(json);
			alert("Added to cart! Thank you!");
			window.location.href="receiverhome.html?username="+username;
		});

		$('#register_btn').click(function () {

			var donor = false;
			var valid = true;
			var username = document.getElementById("register_username").value;
			var password = document.getElementById("register_password").value;
			var firstname = document.getElementById("register_firstname").value;
			var lastname = document.getElementById("register_lastname").value;
			var phone = document.getElementById("register_phone").value;
			var email = document.getElementById("register_email").value;
			var is_donor = document.getElementById("register_is_donor").value;
			var confirm_password = document.getElementById("register_confirm_password").value;

			//var is_donor_value = is_donor.options[e.selectedIndex].text;
			if (is_donor == "donor") {
				donor = true;
			}

			if (username.length == 0) {
				$("#invalid_username_register").show();
				valid = false;
			}
			if (password.length == 0) {
				$("#invalid_password_register").show();
				valid = false;
			}
			if (firstname.length == 0) {
				$("#invalid_firstname").show();
				valid = false;
			}
			if (lastname.length == 0) {
				$("#invalid_lastname").show();
				valid = false;
			}
			if (email.length == 0) {
				$("#invalid_email").show();
				valid = false;
			}
			if (phone.length == 0) {
				$("#invalid_phone").show();
				valid = false;
			}
			if (confirm_password.length == 0) {
				$("#invalid_password_confirm").show();
				valid = false;
			}
			if (password != confirm_password) {
				$("#invalid_password_no_match").show();
				$("#invalid_password_confirm_no_match").show();
				valid = false;
			}

			if (valid) {
				//var http = new XMLHttpRequest();
				//var url = 'http://localhost:8081/adduser';
				//http.setRequestHeader()

				var data = {
					firstname: firstname,
					lastname: lastname,
					phone: phone,
					email: email,
					username: username,
					password: password,
					is_donor: donor
				};

				var json = JSON.stringify(data);
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://localhost:8081/adduser");
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(json);
				if(donor) {
					window.location.href = "donorhome.html?username="+username
				}
				else{
					window.location.href="receiverhome.html?username="+username
				}

			}
		});
	});

	$(document).ready(function() {
///// REGISTER
		$('#donate_btn').click(function () {
			//import swal from 'sweetalert';
			var url = new URL(location.href.toString());
			var query_string = url.search;
			var id=""
			var search_params = new URLSearchParams(query_string);
			var username = search_params.get('username');
			var valid = true;
			var donate_quantity = document.getElementById("donate_quantity").value;
			var donate_date = document.getElementById("donate_date").value;
			var donate_address = document.getElementById("donate_address").value;
			var donate_item = document.getElementById("donate_item").value;
            var id=""

			if (donate_address.length == 0) {
				$("#donate_address_invalid").show();
				valid = false;
			}
			if (donate_date.length == 0) {
				$("#donate_date_invalid").show();
				valid = false;
			}
			if (donate_quantity.length == 0) {
				$("#donate_quantity_invalid").show();
				valid = false;
			}
			/*var request = new XMLHttpRequest()
			request.open('GET', 'http://localhost:8081/username?username=' + username, true)

			request.onload = function () {
				// Begin accessing JSON data here
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				data.forEach(user => {
					id = user._id
					alert(id)
				})
			}
			// Send request
			request.send()*/

			if (valid) {
				var data = {
					item_type: donate_item,
					donate_address: donate_address,
					donate_date: donate_date,
					donate_quantity: donate_quantity,
					user_id: username
				};

				var json = JSON.stringify(data);


				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://localhost:8081/additem");
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(json);
				alert("Item is added! Thank you!");
			}
		});
	});


	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		sliderMain();
		dropdown();
		goToTop();
		loaderPage();
		counterWayPoint();

	});




}());