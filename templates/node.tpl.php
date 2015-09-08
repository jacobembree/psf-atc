<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <div class="node-inner clearfix">
    <?php print render($title_prefix); ?>

    <?php print $unpublished; ?>

    <?php if(!empty($user_picture) || $title || (!empty($submitted) && $display_submitted)): ?>
      <header<?php print $header_attributes; ?>>

        <?php print $user_picture; ?>

        <?php if ($title): ?>
          <h1<?php print $title_attributes; ?>>
            <?php if ($page): ?>
              <?php print $title; ?>
            <?php elseif (!$page): ?>
              <a href="<?php print $node_url; ?>" rel="bookmark"><?php print $title; ?></a>
            <?php endif; ?>
          </h1>
        <?php endif; ?>

        <?php if ($display_submitted): ?>
          <div class="submitted"><?php print $submitted; ?></div>
        <?php endif; ?>

      </header>
    <?php endif; ?>

    <div<?php print $content_attributes; ?>>

      <?php if ($view_mode == "full"): ?>
        <div class="social-share">
          <span>Share</span>
          <ul>
            <li><a target="_blank" href="http://www.linkedin.com/companies/7156/DataServ"><img alt="DataServ on LinkedIn" src="/<?php print path_to_theme(); ?>/images/share-social-linkedin.png"></a></li>
            <li><a target="_blank" href="https://twitter.com/DataServ"><img alt="DataServ on Twitter" src="/<?php print path_to_theme(); ?>/images/share-social-twitter.png"></a></li>
            <li><a target="_blank" href="http://plus.google.com"><img alt="DataServ on Google Plus" src="/<?php print path_to_theme(); ?>/images/share-social-googleplus.png"></a></li>
            <li><a target="_blank" href="mailto:?<?php print "Subject=DataServ&body=" . rawurlencode("Check out http://www.dataserv.us/" . request_path()); ?>"><img alt="Email to a Friend" src="/<?php print path_to_theme(); ?>/images/share-social-email.png"></a></li>
          </ul>
        </div>
      <?php endif; ?>

    <?php
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
    </div>

    <?php if ($links = render($content['links'])): ?>
      <nav<?php print $links_attributes; ?>><?php print $links; ?></nav>
    <?php endif; ?>

    <?php print render($content['comments']); ?>

    <?php print render($title_suffix); ?>
  </div>
</article>
