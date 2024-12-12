import { managementClient } from "@/lib/contentful";
import React, { useState } from "react";
import styles from "./styles.module.css";

const CreateCard = () => {
  const [entryName, setEntryName] = useState("");
  const [overline, setOverline] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const [logoSize, setLogoSize] = useState("");
  const [logo, setLogo] = useState("");
  const [image, setImage] = useState("");
  const [primaryLayout, setPrimaryLayout] = useState("");
  const [position, setPosition] = useState("");
  const [rounding, setRounding] = useState("");
  const [hoverEffect, setHoverEffect] = useState(false);
  const [borderType, setBorderType] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [actions, setActions] = useState("");
  const [buttonPosition, setButtonPosition] = useState("");
  const [stretchImage, setStretchImage] = useState(false);
  const [pillStaffInitiative, setPillStaffInitiative] = useState("");
  const [avatarText, setAvatarText] = useState("");
  const [listIcon, setListIcon] = useState("");
  const [showIconOnMobile, setShowIconOnMobile] = useState(false);
  const [iconColor, setIconColor] = useState("");
  const [size, setSize] = useState("");
  const [variant, setVariant] = useState("");
  const [priceMenuItems, setPriceMenuItems] = useState("");
  const [underlined, setUnderlined] = useState(false);
  const [videoCondensedOnMobile, setVideoCondensedOnMobile] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
      if (!spaceId) {
        setMessage("Contentful Space ID is not defined");
        return;
      }
      const space = await managementClient.getSpace(spaceId);
      const environment = await space.getEnvironment("master");

      if (!environment) {
        setMessage("Environment not found");
        return;
      }

      const data = {
        entryName,
        overline,
        title,
        subtitle,
        showLogo,
        logoSize,
        logo,
        image: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: image.trim(),
          },
        },
        primaryLayout,
        position,
        rounding,
        hoverEffect,
        borderType,
        borderColor,
        actions: {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: actions.trim(),
          },
        },
        buttonPosition,
        stretchImage,
        pillStaffInitiative,
        avatarText,
        listIcon,
        showIconOnMobile,
        iconColor,
        size,
        variant,
        priceMenuItems,
        underlined,
        videoCondensedOnMobile,
      };

      const entry = await environment.createEntry("CoreCard", {
        fields: {
          entryName: {
            "en-US": data.entryName,
          },
          overline: {
            "en-US": data.overline,
          },
          title: {
            "en-US": data.title,
          },
          subtitle: {
            "en-US": data.subtitle,
          },
          showLogo: {
            "en-US": data.showLogo,
          },
          logoSize: {
            "en-US": data.logoSize,
          },
          logo: {
            "en-US": data.logo,
          },
          image: {
            "en-US": data.image,
          },
          primaryLayout: {
            "en-US": data.primaryLayout,
          },
          position: {
            "en-US": data.position,
          },
          rounding: {
            "en-US": data.rounding,
          },
          hoverEffect: {
            "en-US": data.hoverEffect,
          },
          borderType: {
            "en-US": data.borderType,
          },
          borderColor: {
            "en-US": data.borderColor,
          },
          actions: {
            "en-US": data.actions,
          },
          buttonPosition: {
            "en-US": data.buttonPosition,
          },
          stretchImage: {
            "en-US": data.stretchImage,
          },
          pillStaffInitiative: {
            "en-US": data.pillStaffInitiative,
          },
          avatarText: {
            "en-US": data.avatarText,
          },
          listIcon: {
            "en-US": data.listIcon,
          },
          showIconOnMobile: {
            "en-US": data.showIconOnMobile,
          },
          iconColor: {
            "en-US": data.iconColor,
          },
          size: {
            "en-US": data.size,
          },
          variant: {
            "en-US": data.variant,
          },
          priceMenuItems: {
            "en-US": data.priceMenuItems,
          },
          underlined: {
            "en-US": data.underlined,
          },
          videoCondensedOnMobile: {
            "en-US": data.videoCondensedOnMobile,
          },
        },
      });

      setMessage(`Card created successfully with ID: ${entry.sys.id}`);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error creating card: ${error.message}`);
      } else {
        setMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Create Core Card</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Entry Name</label>
          <input
            type="text"
            value={entryName}
            onChange={(e) => setEntryName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Overline</label>
          <input
            type="text"
            value={overline}
            onChange={(e) => setOverline(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Show Logo</label>
          <input
            type="checkbox"
            checked={showLogo}
            onChange={(e) => setShowLogo(e.target.checked)}
            className={styles.checkbox}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Logo Size</label>
          <input
            type="text"
            value={logoSize}
            onChange={(e) => setLogoSize(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Logo</label>
          <input
            type="text"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image ID</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Primary Layout</label>
          <input
            type="text"
            value={primaryLayout}
            onChange={(e) => setPrimaryLayout(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Rounding</label>
          <input
            type="text"
            value={rounding}
            onChange={(e) => setRounding(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Hover Effect</label>
          <input
            type="checkbox"
            checked={hoverEffect}
            onChange={(e) => setHoverEffect(e.target.checked)}
            className={styles.checkbox}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Border Type</label>
          <input
            type="text"
            value={borderType}
            onChange={(e) => setBorderType(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Border Color</label>
          <input
            type="text"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Actions ID</label>
          <input
            type="text"
            value={actions}
            onChange={(e) => setActions(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Button Position</label>
          <input
            type="text"
            value={buttonPosition}
            onChange={(e) => setButtonPosition(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Stretch Image</label>
          <input
            type="checkbox"
            checked={stretchImage}
            onChange={(e) => setStretchImage(e.target.checked)}
            className={styles.checkbox}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Pill Staff Initiative</label>
          <input
            type="text"
            value={pillStaffInitiative}
            onChange={(e) => setPillStaffInitiative(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Avatar Text</label>
          <textarea
            value={avatarText}
            onChange={(e) => setAvatarText(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>List Icon</label>
          <input
            type="text"
            value={listIcon}
            onChange={(e) => setListIcon(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Show Icon On Mobile</label>
          <input
            type="checkbox"
            checked={showIconOnMobile}
            onChange={(e) => setShowIconOnMobile(e.target.checked)}
            className={styles.checkbox}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Icon Color</label>
          <input
            type="text"
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Size</label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Variant</label>
          <input
            type="text"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Price Menu Items</label>
          <textarea
            value={priceMenuItems}
            onChange={(e) => setPriceMenuItems(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Underlined</label>
          <input
            type="checkbox"
            checked={underlined}
            onChange={(e) => setUnderlined(e.target.checked)}
            className={styles.checkbox}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Video Condensed On Mobile</label>
          <input
            type="checkbox"
            checked={videoCondensedOnMobile}
            onChange={(e) => setVideoCondensedOnMobile(e.target.checked)}
            className={styles.checkbox}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Create Card
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default CreateCard;
