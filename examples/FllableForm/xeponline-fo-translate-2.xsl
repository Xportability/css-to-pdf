<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:fo="http://www.w3.org/1999/XSL/Format" 
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns:rx="http://www.renderx.com/XSL/Extensions"
  version="1.0">
  <!-- Licensing Information
This program is free software; you can redistribute it and/or modify it under the terms of the 
GNU Affero General Public License version 3 as published by the Free Software Foundation with the 
addition of the following permission added to Section 15 as permitted in Section 7(a): 

FOR ANY PART OF THE COVERED WORK IN WHICH THE COPYRIGHT IS OWNED BY RENDERX INC, RENDERX DISCLAIMS 
THE WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even 
the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General 
Public License for more details from the following URL: http://www.gnu.org/licenses/agpl.html
    -->
  <xsl:param name="pxtoin" select="1.25"/>
  <xsl:param name="def-page-margin-top" select="'0.5in'"/>
  <xsl:param name="def-page-margin-bottom" select="'0.5in'"/>
  <xsl:param name="def-page-margin-left" select="'0.5in'"/>
  <xsl:param name="def-page-margin-right" select="'0.5in'"/>
  <xsl:template match="//div[@class='xeponline-container']">
    <fo:root font-family="Times New Roman" font-size="16px">
      <xsl:attribute name="xml:base">
        <xsl:value-of select="@base"/>
      </xsl:attribute>
      <xsl:variable name="margin-top">
        <xsl:choose>
          <xsl:when test="@page-margin-top">
            <xsl:value-of select="@page-margin-top"/>
          </xsl:when>
          <xsl:when test="@page-margin">
            <xsl:value-of select="@page-margin"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$def-page-margin-top"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <xsl:variable name="margin-bottom">
        <xsl:choose>
          <xsl:when test="@page-margin-bottom">
            <xsl:value-of select="@page-margin-bottom"/>
          </xsl:when>
          <xsl:when test="@page-margin">
            <xsl:value-of select="@page-margin"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$def-page-margin-bottom"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <xsl:variable name="margin-left">
        <xsl:choose>
          <xsl:when test="@page-margin-left">
            <xsl:value-of select="@page-margin-left"/>
          </xsl:when>
          <xsl:when test="@page-margin">
            <xsl:value-of select="@page-margin"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$def-page-margin-left"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <xsl:variable name="margin-right">
        <xsl:choose>
          <xsl:when test="@page-margin-right">
            <xsl:value-of select="@page-margin-right"/>
          </xsl:when>
          <xsl:when test="@page-margin">
            <xsl:value-of select="@page-margin"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$def-page-margin-right"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <fo:layout-master-set>
        <fo:simple-page-master master-name="svgimage">
          <xsl:attribute name="page-width">
            <xsl:value-of select="@page-width"/>
          </xsl:attribute>
          <xsl:attribute name="page-height">
            <xsl:value-of select="@page-height"/>
          </xsl:attribute>
          <xsl:attribute name="margin-left">
            <xsl:value-of select="$margin-left"/>
          </xsl:attribute>
          <xsl:attribute name="margin-right">
            <xsl:value-of select="$margin-right"/>
          </xsl:attribute>
          <fo:region-body>
            <xsl:attribute name="margin-top">
              <xsl:value-of select="$margin-top"/>
            </xsl:attribute>
            <xsl:attribute name="margin-bottom">
              <xsl:value-of select="$margin-bottom"/>
            </xsl:attribute>
          </fo:region-body>
          <fo:region-before>
            <xsl:attribute name="extent">
              <xsl:value-of select="$margin-top"/>
            </xsl:attribute>
          </fo:region-before>
          <fo:region-after>
            <xsl:attribute name="extent">
              <xsl:value-of select="$margin-bottom"/>
            </xsl:attribute>
          </fo:region-after>
        </fo:simple-page-master>
      </fo:layout-master-set>
      <!-- Modify this to trigger new page sequence for each section -->
      <fo:page-sequence master-reference="svgimage">
        <fo:static-content flow-name="xsl-region-before">
          <xsl:apply-templates select="descendant::header[1]" mode="regions"/>
        </fo:static-content>
        <fo:static-content flow-name="xsl-region-after">
          <xsl:apply-templates select="descendant::footer[1]" mode="regions"/>
        </fo:static-content>
        <fo:static-content flow-name="xsl-footnote-separator">
          <fo:block>
            <fo:leader leader-pattern="rule" leader-length="100%" rule-thickness="0.5pt"
              rule-style="solid" color="black"/>
          </fo:block>
        </fo:static-content>
        <fo:flow flow-name="xsl-region-body">
          <xsl:apply-templates/>
        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  <!-- Header/Footer -->
  <xsl:template match="header | footer" mode="regions">
    <fo:block>
      <xsl:call-template name="processAttr">
        <xsl:with-param name="elem" select="."/>
        <xsl:with-param name="type" select="name()"/>
      </xsl:call-template>
      <xsl:apply-templates select="node()"/>
    </fo:block>
  </xsl:template>
  <!-- Block level elements -->
  <xsl:template
    match="section | article | address | main | div | h1 | h2 | h3 | h4 | h5 | h6 | h7 | h8 | h9 | p | blockquote | figure | figcaption">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <xsl:variable name="floatType">
        <xsl:call-template name="floatType"/>
      </xsl:variable>
      <xsl:choose>
        <xsl:when test="$floatType = 'none'">
          <fo:block>
            <xsl:call-template name="processAttr">
              <xsl:with-param name="elem" select="."/>
              <xsl:with-param name="type" select="name()"/>
            </xsl:call-template>
            <xsl:apply-templates select="node()"/>
          </fo:block>
        </xsl:when>
        <xsl:otherwise>
          <!-- To Do, support floats -->
          <fo:float float="{$floatType}" clear="none">
            <xsl:variable name="width">
              <xsl:call-template name="extractCSSStyle">
                <xsl:with-param name="css" select="@style"/>
                <xsl:with-param name="style" select="'width:'"/>
              </xsl:call-template>
            </xsl:variable>
            <fo:block-container width="{$width}">
              <xsl:call-template name="processAttr">
                <xsl:with-param name="elem" select="."/>
                <xsl:with-param name="type" select="name()"/>
              </xsl:call-template>
              <fo:block>

                <xsl:apply-templates/>
              </fo:block>
            </fo:block-container>
          </fo:float>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>
  <xsl:template match="pre">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:block white-space="pre" linefeed-treatment="preserve" white-space-collapse="false">
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="name()"/>
        </xsl:call-template>
        <xsl:apply-templates select="node()"/>
      </fo:block>
    </xsl:if>
  </xsl:template>

  <!--Inlines -->
  <xsl:template
    match="span | i | b | sup | sub | font | code | em | small | strike | strong | u | dfn | abbr | code | var | samp | kbd | mark">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:inline>
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="name()"/>
        </xsl:call-template>
        <xsl:if test="name()='u'">
          <xsl:attribute name="text-decoration">underline</xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="node()"/>
      </fo:inline>
    </xsl:if>
  </xsl:template>
  <xsl:template match="a">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:basic-link>
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="name()"/>
        </xsl:call-template>
        <xsl:apply-templates select="node()"/>
      </fo:basic-link>
    </xsl:if>
  </xsl:template>
  <xsl:template match="a/@href">
    <xsl:choose>
      <xsl:when test="starts-with(.,'#')">
        <xsl:attribute name="internal-destination">
          <xsl:value-of select="translate(.,'#','')"/>
        </xsl:attribute>
      </xsl:when>
      <xsl:otherwise>
        <xsl:attribute name="external-destination">
          <xsl:choose>
            <xsl:when test="starts-with(.,'url(')">
              <xsl:value-of select="."/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>url('</xsl:text>
              <xsl:value-of select="."/>
              <xsl:text>')</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="q">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:inline>
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="name()"/>
        </xsl:call-template>
        <xsl:text>&quot;</xsl:text>
        <xsl:apply-templates select="node()"/>
        <xsl:text>&quot;</xsl:text>
      </fo:inline>
    </xsl:if>
  </xsl:template>
  <!-- Images -->
  <xsl:template match="img">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:external-graphic>
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="name()"/>
        </xsl:call-template>
      </fo:external-graphic>
    </xsl:if>
  </xsl:template>
  <xsl:template match="svg:svg">
    <fo:instream-foreign-object>
      <svg:svg>
        <xsl:apply-templates select="@*|node()"/>
      </svg:svg>
    </fo:instream-foreign-object>
  </xsl:template>
  <xsl:template match="@gradientUnits">
    <xsl:attribute name="gradientUnits">
      <xsl:text>userSpaceOnUse</xsl:text>
    </xsl:attribute>
  </xsl:template>

  <!-- Tables -->
  <xsl:template match="table">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:table>
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="name()"/>
        </xsl:call-template>
        <!-- Hack override all tables to 100% -->
        <xsl:attribute name="width">
          <xsl:text>100%</xsl:text>
        </xsl:attribute>
        <xsl:apply-templates select="node()"/>
      </fo:table>
    </xsl:if>
  </xsl:template>
  <xsl:template match="tr">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:table-row>
        <xsl:apply-templates/>
      </fo:table-row>
    </xsl:if>
  </xsl:template>
  <xsl:template match="td | th">
    <!-- Trying IE Hack, set default border to no width -->
    <fo:table-cell>
      <xsl:call-template name="processAttr">
        <xsl:with-param name="elem" select="."/>
        <xsl:with-param name="type" select="name()"/>
      </xsl:call-template>
      <fo:block>
        <xsl:apply-templates select="node()"/>
      </fo:block>
    </fo:table-cell>
  </xsl:template>
  <xsl:template match="thead">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:table-header>
        <xsl:apply-templates select="tr"/>
      </fo:table-header>
    </xsl:if>
  </xsl:template>
  <xsl:template match="tfoot">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:table-footer>
        <xsl:apply-templates select="tr"/>
      </fo:table-footer>
    </xsl:if>
  </xsl:template>
  <xsl:template match="tbody">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:table-body>
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="name()"/>
        </xsl:call-template>
        <xsl:apply-templates select="tr"/>
      </fo:table-body>
    </xsl:if>
  </xsl:template>
  <xsl:template match="@colspan">
    <xsl:attribute name="number-columns-spanned">
      <xsl:value-of select="."/>
    </xsl:attribute>
  </xsl:template>
  <xsl:template match="@rowspan">
    <xsl:attribute name="number-rows-spanned">
      <xsl:value-of select="."/>
    </xsl:attribute>
  </xsl:template>

  <!-- Lists -->
  <!-- First match special lists that have inline list items -->
  <xsl:template match="ul[contains(@style,'display: inline')]">
    <fo:block>
      <xsl:call-template name="processAttr">
        <xsl:with-param name="elem" select="."/>
        <xsl:with-param name="type" select="name()"/>
      </xsl:call-template>
      <xsl:apply-templates select="*" mode="inline"/>
    </fo:block>
  </xsl:template>
  <xsl:template match="ul | ol">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:list-block>
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="name()"/>
        </xsl:call-template>
        <xsl:variable name="listStyleType">
          <xsl:call-template name="getListStyle">
            <xsl:with-param name="lists" select="ancestor-or-self::ul | ancestor-or-self::ol"/>
            <xsl:with-param name="pos" select="1"/>
          </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="listStyleImage">
          <xsl:call-template name="getListImage">
            <xsl:with-param name="images"
              select="ancestor-or-self::ul/li[1] | ancestor-or-self::ol/li[1]"/>
            <xsl:with-param name="pos" select="1"/>
          </xsl:call-template>
        </xsl:variable>
        <xsl:apply-templates>
          <xsl:with-param name="listStyleType" select="$listStyleType"/>
          <xsl:with-param name="listStyleImage" select="$listStyleImage"/>
        </xsl:apply-templates>
      </fo:list-block>
    </xsl:if>
  </xsl:template>
  <xsl:template name="getListStyle">
    <xsl:param name="lists"/>
    <xsl:param name="pos"/>
    <xsl:variable name="parentListstyle">
      <xsl:call-template name="extractCSSStyle">
        <xsl:with-param name="css" select="$lists[number($pos)]/@style"/>
        <xsl:with-param name="style" select="'list-style-type:'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$parentListstyle != ''">
        <xsl:value-of select="$parentListstyle"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="number($pos) &lt;= count($lists)">
            <xsl:call-template name="getListStyle">
              <xsl:with-param name="lists" select="$lists"/>
              <xsl:with-param name="pos" select="$pos + 1"/>
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <xsl:choose>
              <xsl:when test="name() = 'ul'">
                <xsl:choose>
                  <xsl:when test="count($lists) = 1">
                    <xsl:value-of select="'disk'"/>
                  </xsl:when>
                  <xsl:when test="count($lists) = 2">
                    <xsl:value-of select="'circle'"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="'square'"/>
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="'decimal'"/>
              </xsl:otherwise>
            </xsl:choose>

          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="getListImage">
    <xsl:param name="images"/>
    <xsl:param name="pos"/>
    <xsl:variable name="parentListstyle">
      <xsl:call-template name="extractCSSStyle">
        <xsl:with-param name="css" select="$images[number($pos)]/@style"/>
        <xsl:with-param name="style" select="'list-style-image:'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$parentListstyle != ''">
        <xsl:value-of select="$parentListstyle"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="number($pos) &lt;= count($images)">
            <xsl:call-template name="getListImage">
              <xsl:with-param name="images" select="$images"/>
              <xsl:with-param name="pos" select="$pos + 1"/>
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="''"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="li" mode="inline">
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:inline>
        <xsl:call-template name="processAttr">
          <xsl:with-param name="elem" select="."/>
          <xsl:with-param name="type" select="'inline'"/>
        </xsl:call-template>
        <xsl:apply-templates/>
      </fo:inline>
    </xsl:if>
  </xsl:template>
  <xsl:template match="li">
    <xsl:param name="listStyleType"/>
    <xsl:param name="listStyleImage"/>
    <xsl:variable name="pos" select="count(preceding-sibling::li) + 1"/>
    <xsl:variable name="isVisible">
      <xsl:call-template name="isVisible"/>
    </xsl:variable>
    <xsl:if test="$isVisible = 'true'">
      <fo:list-item>
        <fo:list-item-label end-indent="label-end()">
          <fo:block text-align="right">
            <xsl:choose>
              <xsl:when test="$listStyleImage != ''">
                <fo:inline>
                  <fo:external-graphic src="{$listStyleImage}"/>
                </fo:inline>
              </xsl:when>
              <xsl:when test="$listStyleType = 'disk'">
                <fo:inline baseline-shift="25%" font-size="40%" font-family="ZapfDingbats"
                  >●</fo:inline>
              </xsl:when>
              <xsl:when test="$listStyleType = 'square'">
                <fo:inline baseline-shift="25%" font-size="40%" font-family="ZapfDingbats"
                  >■</fo:inline>
              </xsl:when>
              <xsl:when test="$listStyleType = 'circle'">
                <fo:inline baseline-shift="25%" font-size="40%" font-family="ZapfDingbats"
                  >❍</fo:inline>
              </xsl:when>
              <xsl:when test="$listStyleType = 'decimal'">
                <xsl:number value="$pos" format="1"/>
                <xsl:text>.</xsl:text>
              </xsl:when>
              <xsl:when test="$listStyleType = 'decimal-leading-zero'">
                <xsl:number value="$pos" format="01"/>
                <xsl:text>.</xsl:text>
              </xsl:when>
              <xsl:when test="$listStyleType = 'lower-alpha' or $listStyleType = 'lower-latin'">
                <xsl:number value="$pos" format="a"/>
                <xsl:text>.</xsl:text>
              </xsl:when>
              <xsl:when test="$listStyleType = 'lower-roman'">
                <xsl:number value="$pos" format="i"/>
                <xsl:text>.</xsl:text>
              </xsl:when>
              <xsl:when test="$listStyleType = 'upper-alpha' or $listStyleType = 'upper-latin'">
                <xsl:number value="$pos" format="A"/>
                <xsl:text>.</xsl:text>
              </xsl:when>
              <xsl:when test="$listStyleType = 'upper-roman'">
                <xsl:number value="$pos" format="I"/>
                <xsl:text>.</xsl:text>
              </xsl:when>
              <xsl:when test="$listStyleType = 'none'"/>
              <xsl:otherwise>
                <fo:inline baseline-shift="25%" font-size="40%" font-family="ZapfDingbats"
                  >●</fo:inline>
              </xsl:otherwise>
            </xsl:choose>
          </fo:block>
        </fo:list-item-label>
        <fo:list-item-body start-indent="body-start()">
          <fo:block>
            <xsl:call-template name="processAttr">
              <xsl:with-param name="elem" select="."/>
              <xsl:with-param name="type" select="name()"/>
            </xsl:call-template>
            <xsl:apply-templates/>
          </fo:block>
        </fo:list-item-body>
      </fo:list-item>
    </xsl:if>
  </xsl:template>
  
  <!-- Form Elements -->
  <xsl:template match="form">
    <xsl:apply-templates/>
  </xsl:template>
  <xsl:template match="input[@type='text']">
        <fo:inline>
          <xsl:call-template name="processAttr">
            <xsl:with-param name="elem" select="."/>
            <xsl:with-param name="type" select="name()"/>
          </xsl:call-template>
          <rx:pdf-form-field>
            <xsl:call-template name="form_field_attributes"/>
            <xsl:element name="rx:pdf-form-field-text">
              <xsl:attribute name="text">
                <xsl:value-of select="."/>
              </xsl:attribute>
            </xsl:element>
          </rx:pdf-form-field>
                <fo:leader>
                  <xsl:attribute name="leader-length">
                    <xsl:call-template name="extractCSSStyle">
                      <xsl:with-param name="css" select="@style"/>
                      <xsl:with-param name="style" select="' width:'"></xsl:with-param>
                    </xsl:call-template>
                  </xsl:attribute>
                </fo:leader>
        </fo:inline>
  </xsl:template>
  
  <!-- Common Field-level Javascript Attributes -->
  <xsl:template name="calculate">
    <xsl:if test="@calculate">
      <xsl:attribute name="js-calculate">
        <xsl:value-of select="@calculate"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>
  <xsl:template name="validate">
    <xsl:if test="@validate">
      <xsl:attribute name="js-validate">
        <xsl:value-of select="@validate"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>
  <xsl:template name="format">
    <xsl:if test="@format">
      <xsl:attribute name="js-format">
        <xsl:value-of select="@format"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>
  <xsl:template name="keystroke">
    <xsl:if test="@keystroke">
      <xsl:attribute name="js-keystroke">
        <xsl:value-of select="@keystroke"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>
  <!-- Other Form Field Attributes -->
  <xsl:template name="form_field_attributes">
    <xsl:call-template name="fieldname"/>
    <xsl:call-template name="readonly"/>
    <xsl:call-template name="maxlen"/>
    <xsl:call-template name="calculate"/>
    <xsl:call-template name="validate"/>
    <xsl:call-template name="format"/>
    <xsl:call-template name="keystroke"/>
  </xsl:template>
  <xsl:template name="maxlen">
    <xsl:if test="@maxlen">
      <xsl:attribute name="maxlen">
        <xsl:value-of select="@maxlen"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>
  <xsl:template name="fieldname">
    <xsl:attribute name="name">
      <xsl:choose>
        <xsl:when test="@name">
          <xsl:value-of select="@name"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="generate-id(.)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>
  </xsl:template>
  <xsl:template name="readonly">
    <xsl:if test="@readonly">
      <xsl:attribute name="readonly">
        <xsl:value-of select="@readonly"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>
  
  
  <!-- Special XSL FO Element Handling -->
  <xsl:template match="footnote">
    <fo:footnote>
      <xsl:apply-templates select="node()"/>
    </fo:footnote>
  </xsl:template>
  <xsl:template match="footnote-body">
    <fo:footnote-body>
      <xsl:apply-templates select="node()"/>
    </fo:footnote-body>
  </xsl:template>
  <xsl:template match="inline">
    <fo:inline>
      <xsl:apply-templates select="node()"/>
    </fo:inline>
  </xsl:template>
  <xsl:template match="block">
    <fo:block>
      <xsl:apply-templates select="node()"/>
    </fo:block>
  </xsl:template>
  <!-- Utility Templates -->
  <xsl:template name="processAttr">
    <xsl:param name="elem"/>
    <xsl:param name="type"/>
    <xsl:call-template name="processCSSStyle">
      <xsl:with-param name="cssString" select="$elem/@style"/>
      <xsl:with-param name="type" select="$type"/>
    </xsl:call-template>
    <xsl:apply-templates select="$elem/@*[not(name()='style') or not(name() = 'fostyle')]"/>
    <xsl:if test="@fostyle">
      <xsl:call-template name="processCSSStyle">
        <xsl:with-param name="cssString" select="$elem/@fostyle"/>
        <xsl:with-param name="type" select="$type"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template name="processCSSStyle">
    <xsl:param name="cssString"/>
    <xsl:param name="type"/>
    <xsl:call-template name="processCSSEntry">
      <xsl:with-param name="attr" select="normalize-space(substring-before($cssString,':'))"/>
      <xsl:with-param name="value"
        select="normalize-space(substring-after(substring-before($cssString,';'),':'))"/>
      <xsl:with-param name="cssRemaining" select="substring-after($cssString,';')"/>
      <xsl:with-param name="type" select="$type"/>
    </xsl:call-template>
  </xsl:template>
  <xsl:template name="processCSSEntry">
    <xsl:param name="attr"/>
    <xsl:param name="value"/>
    <xsl:param name="cssRemaining"/>
    <xsl:param name="type"/>
    <xsl:if test="$attr">
      <xsl:call-template name="handleAttr">
        <xsl:with-param name="attr" select="$attr"/>
        <xsl:with-param name="value" select="$value"/>
        <xsl:with-param name="type" select="$type"/>
      </xsl:call-template>
      <xsl:call-template name="processCSSEntry">
        <xsl:with-param name="attr" select="normalize-space(substring-before($cssRemaining,':'))"/>
        <xsl:with-param name="value"
          select="normalize-space(substring-after(substring-before($cssRemaining,';'),':'))"/>
        <xsl:with-param name="cssRemaining" select="substring-after($cssRemaining,';')"/>
        <xsl:with-param name="type" select="$type"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template name="handleAttr">
    <xsl:param name="attr"/>
    <xsl:param name="value"/>
    <xsl:param name="type"/>
    <!-- CSS to XSL FO Exception Handling -->
    <xsl:choose>
      <xsl:when test="($attr = 'widows') or ($attr = 'orphans')">
        <xsl:attribute name="{$attr}">
          <xsl:choose>
            <xsl:when test="number($value) = $value">
              <xsl:value-of select="$value"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>3</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="$attr = 'background-color'">
        <!-- background-color: rgba(0, 0, 0, 0); -->
        <xsl:if test="$value != 'rgba(0, 0, 0, 0)'">
          <xsl:attribute name="{$attr}">
            <xsl:value-of select="$value"/>
          </xsl:attribute>
        </xsl:if>
      </xsl:when>
      <xsl:when test="$attr = 'width'">
        <xsl:if test="$type = 'img'">
          <xsl:attribute name="content-width">
            <xsl:value-of select="$value"/>
          </xsl:attribute>
        </xsl:if>
      </xsl:when>
      <xsl:when test="$attr = 'height'">
        <xsl:choose>
          <xsl:when test="$type = 'img'">
            <xsl:attribute name="content-height">
              <xsl:value-of select="$value"/>
            </xsl:attribute>
          </xsl:when>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$attr = 'vertical-align'">
        <xsl:choose>
          <xsl:when test="$type = 'td' or $type = 'th' or $type = 'tbody'">
            <xsl:attribute name="display-align">
              <xsl:choose>
                <xsl:when test="$value = 'middle'">
                  <xsl:text>center</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$value"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:attribute>
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="vertical-align">
              <xsl:value-of select="$value"/>
            </xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$attr = 'list-style-type'">
        <!-- Ignore here, the actual implementation is on the li -->
      </xsl:when>
      <xsl:when test="$attr = 'list-style-image'">
        <!-- Ignore here, the actual implementation is on the li -->
      </xsl:when>
      <xsl:when test="$attr = 'margin-top'">
        <!-- Divide by 2 for HTML to FO -->
        <xsl:attribute name="margin-top">
          <xsl:choose>
            <xsl:when test="$type = 'inline'">
              <xsl:value-of select="$value"/>
            </xsl:when>
            <xsl:when test="$type='master'">
              <xsl:variable name="newval" select="number(translate($value,'px','')) * $pxtoin"/>
              <xsl:value-of select="concat($newval,'px')"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:variable name="newval" select="number(translate($value,'px','')) div 2"/>
              <xsl:value-of select="concat($newval,'px')"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="$attr = 'margin-bottom'">
        <!-- Divide by 2 for HTML to FO -->
        <xsl:attribute name="margin-bottom">
          <xsl:choose>
            <xsl:when test="$type = 'inline'">
              <xsl:value-of select="$value"/>
            </xsl:when>
            <xsl:when test="$type='master'">
              <xsl:variable name="newval" select="number(translate($value,'px','')) * $pxtoin"/>
              <xsl:value-of select="concat($newval,'px')"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:variable name="newval" select="number(translate($value,'px','')) div 2"/>
              <xsl:value-of select="concat($newval,'px')"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="$attr = 'margin-left'">
        <xsl:attribute name="margin-left">
          <xsl:choose>
            <xsl:when test="$type='master'">
              <xsl:variable name="newval" select="number(translate($value,'px','')) * $pxtoin"/>
              <xsl:value-of select="concat($newval,'px')"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$value"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="$attr = 'margin-right'">
        <xsl:attribute name="margin-right">
          <xsl:choose>
            <xsl:when test="$type='master'">
              <xsl:variable name="newval" select="number(translate($value,'px','')) * $pxtoin"/>
              <xsl:value-of select="concat($newval,'px')"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$value"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="$attr = 'background-image'">
        <xsl:attribute name="background-image">
          <xsl:value-of select="$value"/>
        </xsl:attribute>
        <!-- FO default is "repeat", override to no-repeat for incoming HTML -->
        <xsl:attribute name="background-repeat">
          <xsl:text>no-repeat</xsl:text>
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="$attr = 'letter-spacing'">
        <xsl:if test="$type != 'img'">
          <xsl:attribute name="letter-spacing">
            <xsl:value-of select="$value"/>
          </xsl:attribute>
        </xsl:if>
      </xsl:when>
      <xsl:when test="$attr = 'display'"/>
      <xsl:when test="contains($attr,'-webkit')"/>
      <xsl:otherwise>
        <xsl:attribute name="{$attr}">
          <xsl:value-of select="$value"/>
        </xsl:attribute>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="@src">
    <xsl:attribute name="src">
      <xsl:choose>
        <xsl:when test="starts-with(.,'url(')">
          <xsl:value-of select="."/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>url('</xsl:text>
          <xsl:value-of select="."/>
          <xsl:text>')</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>
  </xsl:template>
  <xsl:template name="extractCSSStyle">
    <xsl:param name="css"/>
    <xsl:param name="style"/>
    <xsl:value-of select="normalize-space(substring-before(substring-after($css,$style),';'))"/>
  </xsl:template>
  <xsl:template name="isVisible">
    <xsl:variable name="display">
      <xsl:call-template name="extractCSSStyle">
        <xsl:with-param name="css" select="@style"/>
        <xsl:with-param name="style" select="'display:'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$display = 'none'">
        <xsl:value-of select="false()"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="true()"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="floatType">
    <xsl:variable name="float">
      <xsl:call-template name="extractCSSStyle">
        <xsl:with-param name="css" select="@style"/>
        <xsl:with-param name="style" select="'float:'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$float = ''">
        <xsl:value-of select="'none'"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$float"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <!-- Eliminate certain elements and attributes -->
  <xsl:template
    match="header | footer | iframe | script | noscript | embed | object | param | map | area | canvas | audio | video | track | source | nav"/>

  <xsl:template
    match="@border | @class | @alt | @base | @display | @onclick | @target | @float | @page-width | @page-height | @page-margin-right | @page-margin-left | @page-margin-top | @page-margin-bottom | @style[not(ancestor::svg:svg)] | @fostyle"/>

  <xsl:template match="node()" priority="-10">
    <xsl:variable name="display">
      <xsl:call-template name="extractCSSStyle">
        <xsl:with-param name="css" select="@style"/>
        <xsl:with-param name="style" select="'display:'"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$display = 'table'">
        <fo:table>
          <xsl:call-template name="processAttr">
            <xsl:with-param name="elem" select="."/>
            <xsl:with-param name="type" select="name()"/>
          </xsl:call-template>
          <!-- Hack overide all tables to 100% -->
          <xsl:attribute name="width">
            <xsl:text>100%</xsl:text>
          </xsl:attribute>
          <xsl:apply-templates/>
        </fo:table>
      </xsl:when>
      <xsl:when test="$display = 'table-row-group'">
        <fo:table-body>
          <xsl:call-template name="processAttr">
            <xsl:with-param name="elem" select="."/>
            <xsl:with-param name="type" select="name()"/>
          </xsl:call-template>
          <xsl:apply-templates/>
        </fo:table-body>
      </xsl:when>
      <xsl:when test="$display = 'table-header-group'">
        <fo:table-header>
          <fo:table-row>
            <xsl:call-template name="processAttr">
              <xsl:with-param name="elem" select="."/>
              <xsl:with-param name="type" select="name()"/>
            </xsl:call-template>
            <xsl:apply-templates/>
          </fo:table-row>
        </fo:table-header>
      </xsl:when>
      <xsl:when test="$display = 'table-row'">
        <fo:table-row>
          <xsl:call-template name="processAttr">
            <xsl:with-param name="elem" select="."/>
            <xsl:with-param name="type" select="name()"/>
          </xsl:call-template>
          <xsl:apply-templates/>
        </fo:table-row>
      </xsl:when>
      <xsl:when test="$display = 'table-cell'">
        <fo:table-cell>
          <xsl:call-template name="processAttr">
            <xsl:with-param name="elem" select="."/>
            <xsl:with-param name="type" select="name()"/>
          </xsl:call-template>
          <fo:block>
            <xsl:apply-templates/>
          </fo:block>
        </fo:table-cell>
      </xsl:when>
      <xsl:when test="$display = 'block' and not(ancestor::svg:svg)">
        <fo:block>
          <xsl:call-template name="processAttr">
            <xsl:with-param name="elem" select="."/>
            <xsl:with-param name="type" select="name()"/>
          </xsl:call-template>
          <xsl:apply-templates/>
        </fo:block>
      </xsl:when>
      <xsl:when test="$display = 'inline'  and not(ancestor::svg:svg)">
        <fo:inline>
          <xsl:call-template name="processAttr">
            <xsl:with-param name="elem" select="."/>
            <xsl:with-param name="type" select="name()"/>
          </xsl:call-template>
          <xsl:apply-templates/>
        </fo:inline>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <!-- Output everything else as is (Debug only) -->
  <xsl:template match="@*|text()">
    <!-- mode="NOT_USED" -->
    <xsl:copy/>
  </xsl:template>

  <!--<xsl:template match="@*" priority="-1"/>-->
</xsl:stylesheet>
