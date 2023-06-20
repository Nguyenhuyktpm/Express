-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 20, 2023 lúc 04:01 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `info_user`
--

CREATE TABLE `info_user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `info_user`
--

INSERT INTO `info_user` (`id`, `name`, `phoneNumber`, `email`, `userId`) VALUES
(1, 'Phạm Minh Nhật', 333340052, 'phamminhnhat0208@gmail.com', 1),
(2, 'Phạm Minh Nhật', 333340052, 'phamminhnhat0208@gmail.com', 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `ingredients1` varchar(100) NOT NULL,
  `ingredients2` varchar(100) NOT NULL,
  `ingredients3` varchar(100) NOT NULL,
  `ingredients4` varchar(100) NOT NULL,
  `ingredients5` varchar(100) NOT NULL,
  `ingredients6` varchar(100) NOT NULL,
  `idRecipId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `ingredients1`, `ingredients2`, `ingredients3`, `ingredients4`, `ingredients5`, `ingredients6`, `idRecipId`) VALUES
(1, '', '2-1/2 cups bột mì đa dụng', '1/2 cup đường trắng', '1/2 cup đường trắng', '½ cup đường trắng', '1 cup bơ không muối, lạnh và cắt thành miếng nhỏ', '1 cup bơ không muối, lạnh và cắt thành miếng nhỏ', 1),
(2, '', '8 oz (225g) cream cheese, để mềm', '1 cup phô mai mozzarella đã bào nhuyễn', '1 cup phô mai Parmesan đã xay nhuyễn', '1/2 cup mozzarella, grated', '½ cup pepperoni hoặc xúc xích đã cắt nhỏ', '½ cup pepperoni hoặc xúc xích đã cắt nhỏ', 2),
(3, '', '1 bông cải xanh lớn (hoặc khoảng 4 tách bông cải xanh đã rửa sạch và xay nhuyễn thành bột)', '2 quả trứng', '1/2 cup mozzarella, shredded', '1/2 teaspoon bột hành', '1/2 cup phô mai mozzarella đã bào nhuyễn', 'Muối và tiêu, vừa đủ', 3),
(5, '', '1 ½ pounds (680g) thịt bò xay', '½ cup hành tây, đã cắt nhỏ', '2-3 tép tỏi, băm nhuyễn', '1 teaspoon muối', '½ teaspoon hạt tiêu đen', '1 chén phô mai mozzarella, bào nhuyễn', 59),
(6, '', '2 ống bột bánh mì (khoảng 16 ounce hoặc 454g mỗi ống)', '2 ống bột bánh mì (khoảng 16 ounce hoặc 454g mỗi ống)', '2 ống bột bánh mì (khoảng 16 ounce hoặc 454g mỗi ống)', '1/4 cup phô mai Parmesan, đã xay nhuyễn', '1/4 cup bơ, tan chảy', '2-3 tép tỏi, đã băm nhuyễn ', 60),
(7, '', '2-3 ổ bánh mỳ (có thể dùng bánh mỳ Ý hoặc bánh mì sandwich)', '2-3 thìa sữa (hoặc kem tươi)', '2-3 thìa sữa (hoặc kem tươi)', '1 củ hành tây, đã băm nhuyễn', '2-3 tép tỏi, đã băm nhuyễn', '2 cốc nước gà', 61),
(8, '', '2 ổ bánh mì sandwich', '2-3 lát thịt gà nướng hoặc gà chiên, đã cắt thành miếng nhỏ', '1/4 cup sốt Buffalo (hoặc sốt cay tương tự)', '1/4 cup sốt ranch hoặc sốt phô mai (tùy chọn)', '4-6 lát phô mai (như phô mai mozzarella hoặc cheddar)', '2 thìa bơ, để nướng sandwich', 62),
(9, '', '4-6 chén rau cải xanh, đã rửa sạch và cắt nhỏ', '1 quả lê, đã lột vỏ và cắt thành lát mỏng', '1/2 chén quả hạch nho hoặc quả lựu', '1/2 chén quả hạch nho hoặc quả lựu', '1/4 chén hạt hạnh nhân hoặc hạt dẻ', '1/4 chén phô mai feta, đã xay nhuyễn', 63),
(10, '', '1/2 pound (225g) thịt bò xay', '1/2 pound (225g) thịt lợn xay', '1/2 cup rượu đỏ (như rượu vang hoặc rượu Marsala)', '1/2 cup cà rốt, đã băm nhuyễn', '2-3 tép tỏi, đã băm nhuyễn', '1/2 cup rượu đỏ (như rượu vang hoặc rượu Marsala)', 64),
(11, '', '1-2 kg thịt thăn hoặc thịt vai (thịt bò)', '2-3 củ hành tây, đã băm nhuyễn', '3-4 củ tỏi, đã băm nhuyễn', '3-4 củ cà rốt, đã băm nhuyễn', '2-3 củ khoai tây, đã băm nhuyễn', '2-3 thìa canh dầu ô liu', 65),
(12, '', '4-6 củ khoai tây, đã gọt vỏ và cắt thành miếng nhỏ', '1 hành tây, đã băm nhuyễn', '2-3 tép tỏi, đã băm nhuyễn', '4-6 tách nước thịt hoặc nước hỗ trợ', '1/2 chén kem tươi', '1/4 chén bơ', 66),
(13, '', '1 con gà, đã chia thành các phần nhỏ (hoặc 4-6 miếng thịt gà)', '1 con gà, đã chia thành các phần nhỏ (hoặc 4-6 miếng thịt gà)', '2-3 củ tỏi, đã băm nhuyễn', '2-3 củ cà rốt, đã băm nhuyễn', '4-6 tách nước thịt hoặc nước hỗ trợ', '1/2 chén kem tươi (tùy chọn)', 67),
(14, '', '1 chén hạt quinoa, đã rửa sạch', '1 hành tây, đã băm nhuyễn', '1 hành tây, đã băm nhuyễn', '1 cà rốt, đã băm nhuyễn', '1 củ cần tây, đã băm nhuyễn', '1 lon (400g) đậu đen hoặc đậu phụ, đã rửa sạch', 68),
(15, '', '2-3 miếng thịt gà (có thể sử dụng đùi gà hoặc thịt gà tổng hợp)', '2-3 củ hành tây, đã băm nhuyễn', '2-3 củ tỏi, đã băm nhuyễn', '4-6 tách nước thịt hoặc nước hỗ trợ', '1 chén bột mì', '1/4 chén nước lạnh', 69),
(16, '', '2-3 ổ gà (có thể sử dụng thịt gà nguyên miếng hoặc thịt gà băm)', '2-3 củ hành tây, đã băm nhuyễn', '2-3 củ hành tây, đã băm nhuyễn', '2-3 củ cà rốt, đã băm nhuyễn', '1 lon (400g) đậu đen hoặc đậu phụ, đã rửa sạch', '1 lon (400g) cà chua, đã nghiền nhuyễn', 70),
(17, '', '1 chén lúa mạch, đã rửa sạch', '1/2 chén hành tây, đã băm nhuyễn', '1/2 chén cà rốt, đã băm nhuyễn', '1/2 chén cà rốt, đã băm nhuyễn', '1/2 chén dứa tươi, đã lấy hạt và cắt thành miếng nhỏ', '1/4 chén dầu hạt điều hoặc dầu oliu', 71),
(18, '', '1/2 củ cà chua, đã băm nhuyễn', '1 lon (400ml) nước dừa đậm đặc', '1/2 chén nước hoặc nước hỗ trợ', '1/2 chén nước hoặc nước hỗ trợ', '2-3 tép tỏi, đã băm nhuyễn', '1 củ cà rốt, đã băm nhuyễn', 72),
(19, '', '4-6 miếng sườn bò', '2-3 củ hành tây, đã băm nhuyễn', '2-3 củ tỏi, đã băm nhuyễn', '2-3 củ cà rốt, đã băm nhuyễn', '2-3 củ cần tây, đã băm nhuyễn', '2-3 chén nước thịt hoặc nước hỗ trợ', 73),
(20, '', 'Jamie Oliver', '2-3 thìa canh dầu ô liu hoặc dầu hạt cải', '2-3 thìa canh dầu ô liu hoặc dầu hạt cải', '1-2 thìa canh gia vị nướng gà (như gia vị tổng hợp cho gà, gia vị nướng hoặc gia vị ướp gà)', 'Muối và hạt tiêu đen tùy theo khẩu vị', 'Muối và hạt tiêu đen tùy theo khẩu vị', 74),
(21, '', '500g thịt bò thái nhỏ (có thể dùng thịt bò thịt gân hoặc thịt bò múc, tùy theo sở thích)', '2-3 củ hành tây, đã băm nhuyễn', '2-3 củ tỏi, đã băm nhuyễn', '2-3 củ cà rốt, đã băm nhuyễn', '2-3 củ khoai tây, đã băm nhuyễn', '2-3 thìa canh dầu ô liu hoặc dầu hạt cải', 75),
(22, '', '500g cà rốt, đã gọt và thái mỏng', '1 củ hành tây, đã băm nhuyễn', '2-3 tép tỏi, đã băm nhuyễn', '2-3 thìa canh dầu ô liu hoặc dầu hạt cải', '4-5 chén nước thịt hoặc nước hỗ trợ', '2-3 thìa canh tahini (một loại mỡ hạt)', 76),
(23, '', '2 1/2 chén bột mì đa dụng', '2 1/2 chén bột mì đa dụng', '1 chén dầu thực vật 4 quả trứng', '2 chén cà rốt tươi, đã giã nhuyễn', '1 chén quả óc chó hoặc hạt dẻ, đã được băm nhuyễn (tùy chọn) 1 chén nho khô hoặc nho tươi (tùy chọn)', '1 1/2 thìa cà phê bột nở', 77),
(24, '', '2-3 củ cà rốt, đã gọt và cắt thành khối nhỏ', '2-3 củ cà rốt, đã gọt và cắt thành khối nhỏ', '2-3 củ cà rốt, đã gọt và cắt thành khối nhỏ', 'Muối và hạt tiêu đen tùy theo khẩu vị', 'Muối và hạt tiêu đen tùy theo khẩu vị', '4-5 chén nước thịt hoặc nước hỗ trợ', 78),
(25, '', '6-8 lát thịt ba chỉ, đã chín và được cắt nhỏ', '1 hành tây, đã băm nhỏ', '2-3 tép tỏi, đã băm nhỏ', '4-5 củ khoai tây, đã gọt và cắt thành khối nhỏ', '4-5 củ khoai tây, đã gọt và cắt thành khối nhỏ', '4-5 củ khoai tây, đã gọt và cắt thành khối nhỏ', 79),
(26, '', 'The Pioneer Woman', 'The Pioneer Woman', '150g phô mai, đã cắt thành lát mỏng hoặc sợi', '1/2 chén rau mùi tươi, đã rửa và đã cắt nhỏ', '1/2 chén hành lá tươi, đã rửa và đã cắt nhỏ', '1/2 chén hành tím, đã rửa và đã cắt nhỏ 1/2 chén sốt kem, mayonnaise hoặc sốt cà chua (tùy chọn)', 80),
(27, '', '500g cà rốt, đã gọt và đã cắt thành miếng dài', '2-3 thìa canh bơ', '2-3 thìa canh bơ', '1/4 chén whiskey', 'Muối và hạt tiêu đen tùy theo khẩu vị', 'Rau thơm tươi để trang trí (như rau mùi hoặc rau húng, tùy chọn)', 81),
(28, '', '1 chén quinoa', '2 chén nước', '2 chén cải brocoli tươi, đã cắt nhỏ 2-3 tép tỏi, đã băm nhỏ 1/4 chén hạt hướng dương hoặc hạt dẻ cườ', '2 chén cải brocoli tươi, đã cắt nhỏ 2-3 tép tỏi, đã băm nhỏ 1/4 chén hạt hướng dương hoặc hạt dẻ cườ', '1/4 chén nước sốt xì dầu (hoặc theo khẩu vị)', '2-3 thìa canh dầu ô liu', 82),
(29, '', '1 chén quinoa 2 chén nước 2 chén cải brocoli tươi, đã cắt nhỏ', '1/4 chén nước sốt kem (hoặc sốt bơ phô mai)', '1/4 chén nước sốt kem (hoặc sốt bơ phô mai)', '2-3 tép tỏi, đã băm nhỏ', '2-3 tép tỏi, đã băm nhỏ', 'Muối và hạt tiêu đen tùy theo khẩu vị', 83);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `publisher` varchar(100) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `timetocook` int(11) NOT NULL,
  `socialRank` int(11) NOT NULL,
  `publisherUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `publisher`, `imageUrl`, `timetocook`, `socialRank`, `publisherUrl`) VALUES
(1, 'Deep Dish Fruit Pizza', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg', 60, 100, 'http://thepioneerwoman.com'),
(2, 'Pizza Dip', 'Closet Cooking', 'http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg', 60, 100, 'http://closetcooking.com'),
(3, 'Cauliflower Pizza Crust (with BBQ Chicken Pizza)', 'Closet Cooking', 'http://forkify-api.herokuapp.com/images/Pizza2BQuesadillas2B2528aka2BPizzadillas25292B5002B834037bf306b.jpg', 50, 99, 'http://closetcooking.com'),
(59, 'Supreme Pizza Burgers', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/burger53be.jpg', 60, 0, 'http://thepioneerwoman.com'),
(60, 'Pizza Monkey Bread', 'What\'s Gaby Cooking', 'http://forkify-api.herokuapp.com/images/PizzaMonkeyBread67f8.jpg', 60, 0, 'http://whatsgabycooking.com/pizza-monkey-bread/'),
(61, 'Súp gà Buffalo.', 'Closet Cooking', 'http://forkify-api.herokuapp.com/images/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg', 60, 0, 'http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html'),
(62, 'Bánh sandwich phô mai gà Buffalo nướng.', 'Closet Cooking', 'http://forkify-api.herokuapp.com/images/Buffalo2BChicken2BGrilled2BCheese2BSandwich2B5002B4983f2702fe4.jpg', 60, 0, 'http://www.closetcooking.com/2011/08/buffalo-chicken-grilled-cheese-sandwich.html'),
(63, 'Salad rau cải xanh', '101 Cookbooks', 'http://forkify-api.herokuapp.com/images/kale_market_saladd20e.jpg', 60, 0, 'http://www.101cookbooks.com/archives/kale-market-salad-recipe.html'),
(64, 'Sốt Bolognese của Pastor Ryan', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/3544277679_04bcd3011b51c3.jpg', 30, 0, 'http://thepioneerwoman.com/cooking/2009/05/ryans-bolognese-sauce/'),
(65, 'Thịt nướng chảo', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/potroast4564.jpg', 60, 0, 'http://thepioneerwoman.com/cooking/2011/09/2008_the_year_of_the_pot_roast/'),
(66, 'Súp khoai tây hoàn hảo.', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/potatosoup66f2.jpg', 60, 0, 'http://thepioneerwoman.com/cooking/2013/01/perfect-potato-soup/'),
(67, 'Gà và bánh hấp.', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/5258969545_eeb0c35356_o7eee.jpg', 60, 0, 'http://thepioneerwoman.com/cooking/2010/12/chicken-and-dumplings/'),
(68, 'Chili hạt điều chay.', 'Two Peas and Their Pod', 'http://forkify-api.herokuapp.com/images/quinoachili15b76.jpg', 60, 0, 'http://www.twopeasandtheirpod.com/vegetarian-quinoa-chili/'),
(69, 'Gà và mì tự làm', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/4302390134_8a04478597_oc153.jpg', 60, 0, 'http://thepioneerwoman.com/cooking/2010/01/homemade-chicken-and-noodles/'),
(70, 'Chili Gà Buffalo.', 'Closet Cooking', 'http://forkify-api.herokuapp.com/images/Buffalo2BChicken2BChili2B5002B9548b7d71737.jpg', 60, 0, 'http://www.closetcooking.com/2012/04/buffalo-chicken-chili.html'),
(71, 'Salad lúa mạch Á.', 'Two Peas and Their Pod', 'http://forkify-api.herokuapp.com/images/AsianQuinoaSalad1c875.jpg', 60, 0, 'http://www.twopeasandtheirpod.com/asian-quinoa-salad/'),
(72, 'Công thức Lúa mạch dừa Thái cay', 'Chow', 'http://forkify-api.herokuapp.com/images/30507_RecipeImage_620x413_spicy_thai_coconut_quinoaa3db.jpg', 60, 0, 'http://www.chow.com/recipes/30507-spicy-thai-coconut-quinoa'),
(73, 'Sườn bò nướng với rượu vang đỏ.', 'Bon Appetit', 'http://forkify-api.herokuapp.com/images/Red_Wine_Braised_Short_Ribs_646a119.jpg', 60, 0, 'http://www.bonappetit.com/recipes/2011/10/red-wine-braised-short-ribs'),
(74, 'Gà nướng hoàn hảo', 'Jamie Oliver', 'http://forkify-api.herokuapp.com/images/390_1_1350903747_lrg0b42.jpg', 60, 0, 'http://www.jamieoliver.com/recipes/chicken-recipes/perfect-roast-chicken'),
(75, 'Món hầm vào Chủ Nhật tối.', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/stew26d82.jpg', 60, 0, 'http://thepioneerwoman.com/cooking/2013/01/sunday-night-stew/'),
(76, 'Súp cà rốt với tahini và đậu cốt hạt giòn', 'Smitten Kitchen', 'http://forkify-api.herokuapp.com/images/8339826009_36377776f160dc.jpg', 60, 0, 'http://smittenkitchen.com/blog/2013/01/carrot-soup-with-tahini-and-crisped-chickpeas/'),
(77, 'Bánh cà rốt.', 'BBC Good Food', 'http://forkify-api.herokuapp.com/images/4425_MEDIUMc880.jpg', 60, 0, 'http://www.bbcgoodfood.com/recipes/4425/carrot-cake'),
(78, 'Súp Cải xoăn và Rau củ nướng', 'Simply Recipes', 'http://forkify-api.herokuapp.com/images/kalewhitebeansoup300x20052e63a6f.jpg', 60, 0, 'http://www.simplyrecipes.com/recipes/kale_and_roasted_vegetable_soup/'),
(79, 'Súp Burger Hai Lớp Phô Mai và Thịt Ba chỉ', 'Closet Cooking', 'http://forkify-api.herokuapp.com/images/Bacon2BDouble2BCheeseburger2BSoup2B5002B0677c192317c.jpg', 60, 0, 'http://www.closetcooking.com/2012/09/bacon-double-cheeseburger-soup.html'),
(80, 'Bánh cuộn Tortilla.', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/rollupscf15.jpg', 60, 0, 'http://thepioneerwoman.com/cooking/2012/05/tortilla-rollups/'),
(81, 'Cà rốt xốt Whiskey.', 'The Pioneer Woman', 'http://forkify-api.herokuapp.com/images/WhiskeyGlazedCarrotsddc3.jpg', 60, 0, 'http://thepioneerwoman.com/cooking/2008/10/whiskey-glazed-carrots-major-league-yum/'),
(82, 'Món Quinoa với Cải Broccoli Hai Lớp', '101 Cookbooks', 'http://forkify-api.herokuapp.com/images/broccoli_pesto_quinoa4c75.jpg', 60, 0, 'http://www.101cookbooks.com/archives/double-broccoli-quinoa-recipe.html'),
(83, 'Quinoa với Cải Broccoli và Phô mai.', 'Closet Cooking', 'http://forkify-api.herokuapp.com/images/Cheesy2BBroccoli2BQuinoa2B5002B4620b7a2a308.jpg', 60, 0, 'http://www.closetcooking.com/2012/11/cheesy-broccoli-quinoa.html');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL,
  `username` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `password`, `role`, `username`) VALUES
(1, '$2b$10$I2j8Krp0P65DRWY0eG2Edul28pXMpewyM.lLMq9Hlh6Wa.9ektbf6', 'admin', 'admin'),
(7, '$2b$10$CkNcESp/53TydlNiZqtwj.sOHap4M4lx93H5ddRpiNsIJ4yyeFJNy', 'member', 'member2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_recipes_recipes`
--

CREATE TABLE `user_recipes_recipes` (
  `userId` int(11) NOT NULL,
  `recipesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `info_user`
--
ALTER TABLE `info_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_93cf2d2b6ff96e589d40e7bc83` (`userId`);

--
-- Chỉ mục cho bảng `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_9bf576573e4ba35f65d0ab39c6` (`idRecipId`);

--
-- Chỉ mục cho bảng `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_aebbaa1cd38e2e5996d5847753` (`title`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`);

--
-- Chỉ mục cho bảng `user_recipes_recipes`
--
ALTER TABLE `user_recipes_recipes`
  ADD PRIMARY KEY (`userId`,`recipesId`),
  ADD KEY `IDX_798345c46da3f713fa7ce5cb34` (`userId`),
  ADD KEY `IDX_247c84ba6358141c24702ad76b` (`recipesId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `info_user`
--
ALTER TABLE `info_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `info_user`
--
ALTER TABLE `info_user`
  ADD CONSTRAINT `FK_93cf2d2b6ff96e589d40e7bc838` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `FK_9bf576573e4ba35f65d0ab39c69` FOREIGN KEY (`idRecipId`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `user_recipes_recipes`
--
ALTER TABLE `user_recipes_recipes`
  ADD CONSTRAINT `FK_247c84ba6358141c24702ad76bd` FOREIGN KEY (`recipesId`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_798345c46da3f713fa7ce5cb34c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
