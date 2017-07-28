<?php
/**
* The Footer template for our theme
*
* @package aerotur
* @subpackage aerotur
* @since Aerotur 1.0
*/
$rodape = get_ativar();
    //if($rodape['ativar_footer'] == false){echo 'display:none;';}
?>

<section style="display:block;" id="footer-quatro">
    <div class="container"> <!-- container -->
        <div class="row">   <!-- row -->
            <div class="footer-four" id="footer-four"> <!-- footer-four -->
                <?php
                $args_post = array('post_type' => 'footer', 'posts_per_page'=>400, 'order'=>'ASC');
                $myposts_post = get_posts( $args_post );
                foreach ( $myposts_post as $post_post ){
                    setup_postdata( $post_post );
                        $id2 = $post_post->ID;
                        $rodape = get_rodape($id2);
                    ?>
                    <div class="coluna-lista">
                        <div>
                            <h4><?= $rodape['texto_topico_rodape_horizontal']?></h4>
                            <ul class="list-unstyled">
                                <a href="<?= $rodape['link1']?>" target="_blank"><li><?= $rodape['texto_topico_rodape_vertical1']?></li></a>
                                <a href="<?= $rodape['link2']?>" target="_blank"><li><?= $rodape['texto_topico_rodape_vertical2']?></li></a>
                                <a href="<?= $rodape['link3']?>" target="_blank"><li><?= $rodape['texto_topico_rodape_vertical3']?></li></a>
                                <a href="<?= $rodape['link4']?>" target="_blank"><li><?= $rodape['texto_topico_rodape_vertical4']?></li></a>
                                <a href="<?= $rodape['link5']?>" target="_blank"><li><?= $rodape['texto_topico_rodape_vertical5']?></li></a>
                            </ul>
                        </div>
                    </div>
                <? } ?>
            </div> <!-- footer-four -->
        </div> <!-- row -->
    </div> <!-- container -->
</section>

    <div class="container-fluid">
        <div class="row">
            <div class="logo-quadra c-red">
            <a href="http://www.quadradigital.com.br/"><img src="<?php bloginfo('template_url') ?>/imgs/logoquadra.png" alt="Quadradigital"></a>
            </div>
        </div> <!-- FIM row -->
    </div> <!-- FIM container-fluid -->
</footer> <!-- FIM footer -->

<script>window.jQuery || document.write('<script src="<?php bloginfo('template_url') ?>/assets/js/vendor/jquery.min.js"><\/script>')</script>
<script src="<?php bloginfo('template_url') ?>/assets/dist/js/bootstrap.min.js"></script>
<script src="<?php bloginfo('template_url') ?>/assets/js/markerclusterer.js"></script>
<script src="<?php bloginfo('template_url') ?>/assets/js/ie10-viewport-bug-workaround.js"></script>
<script src="<?php bloginfo('template_url') ?>/assets/js/slippry.js"></script>
<script src="<?php bloginfo('template_url') ?>/assets/js/jquery.mask.min.js"></script>     <!-- JQUERY MASK PLUGIN -->
<!-- <script src="<?php //bloginfo('template_url') ?>/assets/js/r.js"></script> -->
<script src="<?php bloginfo('template_url') ?>/assets/js/jquery.bxslider.min.js"></script>
<script src="<?php bloginfo('template_url') ?>/assets/js/jquery.smooth-scroll.min.js"></script>
<script src="<?php bloginfo('template_url') ?>/assets/js/scripts.js"></script>
<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAf9cZ1VgbhlsYhqfkk7pHwVNlP4P4t9sM&callback=initMap"></script>

<script>
    $(document).ready(function(){
        $('selector').slippry();
        $('.slider4').bxSlider({
            slideWidth: 365,
            minSlides: 1,
            maxSlides: 3,
            moveSlides: 1,
            pager: false,
            slideMargin: 10
        });
    });
</script>

<script type="text/javascript">
    var thumbs = jQuery('#thumbnails').slippry({
        // general elements & wrapper
        slippryWrapper: '<div class="slippry_box thumbnails" />',
        // options
        transition: 'horizontal',
        pager: false,
        auto: false,
            onSlideBefore: function (el, index_old, index_new) {
                jQuery('.thumbs a img').removeClass('active');
                jQuery('img', jQuery('.thumbs a')[index_new]).addClass('active');
            }
        });
    jQuery('.thumbs a').click(function () {
        thumbs.goToSlide($(this).data('slide'));
        return false;
    });
</script>
</body>
</html>