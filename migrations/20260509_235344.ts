import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_optionals_category" AS ENUM('comfort', 'sicurezza', 'multimedia', 'esterni', 'interni', 'assistenza-guida');
  CREATE TYPE "public"."enum_vehicles_availability" AS ENUM('available', 'reserved', 'sold', 'incoming');
  CREATE TYPE "public"."enum_vehicles_condition" AS ENUM('nuovo', 'km0', 'aziendale', 'usato');
  CREATE TYPE "public"."enum_vehicles_fuel" AS ENUM('benzina', 'diesel', 'gpl', 'metano', 'ibrida', 'ibrida-plug-in', 'elettrica');
  CREATE TYPE "public"."enum_vehicles_transmission" AS ENUM('manuale', 'automatico', 'semiautomatico');
  CREATE TYPE "public"."enum_vehicles_drivetrain" AS ENUM('anteriore', 'posteriore', 'integrale');
  CREATE TYPE "public"."enum_vehicles_euro_class" AS ENUM('euro-4', 'euro-5', 'euro-6', 'euro-6d', 'euro-6e');
  CREATE TYPE "public"."enum_vehicles_body_type" AS ENUM('berlina', 'station-wagon', 'suv', 'crossover', 'coupe', 'cabrio', 'monovolume', 'city-car', 'pick-up');
  CREATE TYPE "public"."enum_vehicles_exterior_color_type" AS ENUM('metallizzato', 'pastello', 'perlato', 'opaco');
  CREATE TYPE "public"."enum_vehicles_interior_material" AS ENUM('tessuto', 'pelle', 'pelle-tessuto', 'alcantara', 'pelle-alcantara');
  CREATE TYPE "public"."enum_vehicles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__vehicles_v_version_availability" AS ENUM('available', 'reserved', 'sold', 'incoming');
  CREATE TYPE "public"."enum__vehicles_v_version_condition" AS ENUM('nuovo', 'km0', 'aziendale', 'usato');
  CREATE TYPE "public"."enum__vehicles_v_version_fuel" AS ENUM('benzina', 'diesel', 'gpl', 'metano', 'ibrida', 'ibrida-plug-in', 'elettrica');
  CREATE TYPE "public"."enum__vehicles_v_version_transmission" AS ENUM('manuale', 'automatico', 'semiautomatico');
  CREATE TYPE "public"."enum__vehicles_v_version_drivetrain" AS ENUM('anteriore', 'posteriore', 'integrale');
  CREATE TYPE "public"."enum__vehicles_v_version_euro_class" AS ENUM('euro-4', 'euro-5', 'euro-6', 'euro-6d', 'euro-6e');
  CREATE TYPE "public"."enum__vehicles_v_version_body_type" AS ENUM('berlina', 'station-wagon', 'suv', 'crossover', 'coupe', 'cabrio', 'monovolume', 'city-car', 'pick-up');
  CREATE TYPE "public"."enum__vehicles_v_version_exterior_color_type" AS ENUM('metallizzato', 'pastello', 'perlato', 'opaco');
  CREATE TYPE "public"."enum__vehicles_v_version_interior_material" AS ENUM('tessuto', 'pelle', 'pelle-tessuto', 'alcantara', 'pelle-alcantara');
  CREATE TYPE "public"."enum__vehicles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_leads_type" AS ENUM('info', 'test-drive', 'valutazione', 'finanziamento');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('nuovo', 'contattato', 'chiuso');
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_text_section_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_cta_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_text_section_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_social_platform" AS ENUM('facebook', 'instagram', 'youtube', 'tiktok', 'linkedin');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_full_url" varchar,
  	"sizes_full_width" numeric,
  	"sizes_full_height" numeric,
  	"sizes_full_mime_type" varchar,
  	"sizes_full_filesize" numeric,
  	"sizes_full_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "makes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "optionals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category" "enum_optionals_category" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar NOT NULL,
  	"hours" varchar NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"zip" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"province" varchar NOT NULL,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"coordinates" geometry(Point),
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vehicles_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vehicles_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "vehicles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"internal_code" varchar,
  	"availability" "enum_vehicles_availability" DEFAULT 'available',
  	"featured" boolean DEFAULT false,
  	"make_id" integer,
  	"model" varchar,
  	"trim" varchar,
  	"condition" "enum_vehicles_condition",
  	"first_registration" timestamp(3) with time zone,
  	"mileage" numeric,
  	"fuel" "enum_vehicles_fuel",
  	"transmission" "enum_vehicles_transmission",
  	"drivetrain" "enum_vehicles_drivetrain",
  	"displacement" numeric,
  	"power_kw" numeric,
  	"power_cv" numeric,
  	"co2" numeric,
  	"euro_class" "enum_vehicles_euro_class",
  	"doors" numeric,
  	"seats" numeric,
  	"body_type" "enum_vehicles_body_type",
  	"exterior_color" varchar,
  	"exterior_color_type" "enum_vehicles_exterior_color_type",
  	"interior_color" varchar,
  	"interior_material" "enum_vehicles_interior_material",
  	"price" numeric,
  	"price_strikethrough" numeric,
  	"vat_deductible" boolean,
  	"financing_monthly" numeric,
  	"description" jsonb,
  	"video_url" varchar,
  	"location_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_vehicles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "vehicles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"optionals_id" integer
  );
  
  CREATE TABLE "_vehicles_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vehicles_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vehicles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_internal_code" varchar,
  	"version_availability" "enum__vehicles_v_version_availability" DEFAULT 'available',
  	"version_featured" boolean DEFAULT false,
  	"version_make_id" integer,
  	"version_model" varchar,
  	"version_trim" varchar,
  	"version_condition" "enum__vehicles_v_version_condition",
  	"version_first_registration" timestamp(3) with time zone,
  	"version_mileage" numeric,
  	"version_fuel" "enum__vehicles_v_version_fuel",
  	"version_transmission" "enum__vehicles_v_version_transmission",
  	"version_drivetrain" "enum__vehicles_v_version_drivetrain",
  	"version_displacement" numeric,
  	"version_power_kw" numeric,
  	"version_power_cv" numeric,
  	"version_co2" numeric,
  	"version_euro_class" "enum__vehicles_v_version_euro_class",
  	"version_doors" numeric,
  	"version_seats" numeric,
  	"version_body_type" "enum__vehicles_v_version_body_type",
  	"version_exterior_color" varchar,
  	"version_exterior_color_type" "enum__vehicles_v_version_exterior_color_type",
  	"version_interior_color" varchar,
  	"version_interior_material" "enum__vehicles_v_version_interior_material",
  	"version_price" numeric,
  	"version_price_strikethrough" numeric,
  	"version_vat_deductible" boolean,
  	"version_financing_monthly" numeric,
  	"version_description" jsonb,
  	"version_video_url" varchar,
  	"version_location_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__vehicles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_vehicles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"optionals_id" integer
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"type" "enum_leads_type" DEFAULT 'info' NOT NULL,
  	"status" "enum_leads_status" DEFAULT 'nuovo' NOT NULL,
  	"message" varchar,
  	"vehicle_id" integer,
  	"vehicle_snapshot" jsonb,
  	"notes" jsonb,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_pages_blocks_hero_cta_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"align" "enum_pages_blocks_text_section_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Domande frequenti',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"role" varchar,
  	"quote" varchar,
  	"rating" numeric DEFAULT 5
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__pages_v_blocks_hero_cta_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"align" "enum__pages_v_blocks_text_section_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Domande frequenti',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"role" varchar,
  	"quote" varchar,
  	"rating" numeric DEFAULT 5,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"makes_id" integer,
  	"optionals_id" integer,
  	"locations_id" integer,
  	"vehicles_id" integer,
  	"leads_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"favicon_id" integer,
  	"color_primary" varchar DEFAULT '#3a52c4',
  	"color_accent" varchar DEFAULT '#0f172a',
  	"phone" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"company_name" varchar,
  	"vat" varchar,
  	"rea" varchar,
  	"footer_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "finance_settings_available_months" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"months" numeric NOT NULL
  );
  
  CREATE TABLE "finance_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_tan" numeric DEFAULT 6.95 NOT NULL,
  	"default_taeg" numeric DEFAULT 8.45 NOT NULL,
  	"default_down_payment_percent" numeric DEFAULT 20 NOT NULL,
  	"default_months" numeric DEFAULT 60 NOT NULL,
  	"disclaimer" varchar DEFAULT 'Esempio rappresentativo. Calcolo indicativo non vincolante: condizioni soggette a valutazione finanziaria.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "makes" ADD CONSTRAINT "makes_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_opening_hours" ADD CONSTRAINT "locations_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_highlights" ADD CONSTRAINT "vehicles_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_gallery" ADD CONSTRAINT "vehicles_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vehicles_gallery" ADD CONSTRAINT "vehicles_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_make_id_makes_id_fk" FOREIGN KEY ("make_id") REFERENCES "public"."makes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vehicles_rels" ADD CONSTRAINT "vehicles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_rels" ADD CONSTRAINT "vehicles_rels_optionals_fk" FOREIGN KEY ("optionals_id") REFERENCES "public"."optionals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_version_highlights" ADD CONSTRAINT "_vehicles_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_version_gallery" ADD CONSTRAINT "_vehicles_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v_version_gallery" ADD CONSTRAINT "_vehicles_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v" ADD CONSTRAINT "_vehicles_v_parent_id_vehicles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v" ADD CONSTRAINT "_vehicles_v_version_make_id_makes_id_fk" FOREIGN KEY ("version_make_id") REFERENCES "public"."makes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v" ADD CONSTRAINT "_vehicles_v_version_location_id_locations_id_fk" FOREIGN KEY ("version_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v_rels" ADD CONSTRAINT "_vehicles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_rels" ADD CONSTRAINT "_vehicles_v_rels_optionals_fk" FOREIGN KEY ("optionals_id") REFERENCES "public"."optionals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_cta" ADD CONSTRAINT "pages_blocks_hero_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_section" ADD CONSTRAINT "pages_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_images" ADD CONSTRAINT "pages_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_images" ADD CONSTRAINT "pages_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid" ADD CONSTRAINT "pages_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_cta" ADD CONSTRAINT "_pages_v_blocks_hero_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_section" ADD CONSTRAINT "_pages_v_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_images" ADD CONSTRAINT "_pages_v_blocks_image_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid_images" ADD CONSTRAINT "_pages_v_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_grid" ADD CONSTRAINT "_pages_v_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_og_image_id_media_id_fk" FOREIGN KEY ("version_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_makes_fk" FOREIGN KEY ("makes_id") REFERENCES "public"."makes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_optionals_fk" FOREIGN KEY ("optionals_id") REFERENCES "public"."optionals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vehicles_fk" FOREIGN KEY ("vehicles_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "finance_settings_available_months" ADD CONSTRAINT "finance_settings_available_months_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."finance_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_full_sizes_full_filename_idx" ON "media" USING btree ("sizes_full_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "makes_name_idx" ON "makes" USING btree ("name");
  CREATE UNIQUE INDEX "makes_slug_idx" ON "makes" USING btree ("slug");
  CREATE INDEX "makes_logo_idx" ON "makes" USING btree ("logo_id");
  CREATE INDEX "makes_updated_at_idx" ON "makes" USING btree ("updated_at");
  CREATE INDEX "makes_created_at_idx" ON "makes" USING btree ("created_at");
  CREATE UNIQUE INDEX "optionals_name_idx" ON "optionals" USING btree ("name");
  CREATE INDEX "optionals_updated_at_idx" ON "optionals" USING btree ("updated_at");
  CREATE INDEX "optionals_created_at_idx" ON "optionals" USING btree ("created_at");
  CREATE INDEX "locations_opening_hours_order_idx" ON "locations_opening_hours" USING btree ("_order");
  CREATE INDEX "locations_opening_hours_parent_id_idx" ON "locations_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "vehicles_highlights_order_idx" ON "vehicles_highlights" USING btree ("_order");
  CREATE INDEX "vehicles_highlights_parent_id_idx" ON "vehicles_highlights" USING btree ("_parent_id");
  CREATE INDEX "vehicles_gallery_order_idx" ON "vehicles_gallery" USING btree ("_order");
  CREATE INDEX "vehicles_gallery_parent_id_idx" ON "vehicles_gallery" USING btree ("_parent_id");
  CREATE INDEX "vehicles_gallery_image_idx" ON "vehicles_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "vehicles_slug_idx" ON "vehicles" USING btree ("slug");
  CREATE INDEX "vehicles_make_idx" ON "vehicles" USING btree ("make_id");
  CREATE INDEX "vehicles_location_idx" ON "vehicles" USING btree ("location_id");
  CREATE INDEX "vehicles_updated_at_idx" ON "vehicles" USING btree ("updated_at");
  CREATE INDEX "vehicles_created_at_idx" ON "vehicles" USING btree ("created_at");
  CREATE INDEX "vehicles__status_idx" ON "vehicles" USING btree ("_status");
  CREATE INDEX "vehicles_rels_order_idx" ON "vehicles_rels" USING btree ("order");
  CREATE INDEX "vehicles_rels_parent_idx" ON "vehicles_rels" USING btree ("parent_id");
  CREATE INDEX "vehicles_rels_path_idx" ON "vehicles_rels" USING btree ("path");
  CREATE INDEX "vehicles_rels_optionals_id_idx" ON "vehicles_rels" USING btree ("optionals_id");
  CREATE INDEX "_vehicles_v_version_highlights_order_idx" ON "_vehicles_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_vehicles_v_version_highlights_parent_id_idx" ON "_vehicles_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_vehicles_v_version_gallery_order_idx" ON "_vehicles_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_vehicles_v_version_gallery_parent_id_idx" ON "_vehicles_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_vehicles_v_version_gallery_image_idx" ON "_vehicles_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_vehicles_v_parent_idx" ON "_vehicles_v" USING btree ("parent_id");
  CREATE INDEX "_vehicles_v_version_version_slug_idx" ON "_vehicles_v" USING btree ("version_slug");
  CREATE INDEX "_vehicles_v_version_version_make_idx" ON "_vehicles_v" USING btree ("version_make_id");
  CREATE INDEX "_vehicles_v_version_version_location_idx" ON "_vehicles_v" USING btree ("version_location_id");
  CREATE INDEX "_vehicles_v_version_version_updated_at_idx" ON "_vehicles_v" USING btree ("version_updated_at");
  CREATE INDEX "_vehicles_v_version_version_created_at_idx" ON "_vehicles_v" USING btree ("version_created_at");
  CREATE INDEX "_vehicles_v_version_version__status_idx" ON "_vehicles_v" USING btree ("version__status");
  CREATE INDEX "_vehicles_v_created_at_idx" ON "_vehicles_v" USING btree ("created_at");
  CREATE INDEX "_vehicles_v_updated_at_idx" ON "_vehicles_v" USING btree ("updated_at");
  CREATE INDEX "_vehicles_v_latest_idx" ON "_vehicles_v" USING btree ("latest");
  CREATE INDEX "_vehicles_v_autosave_idx" ON "_vehicles_v" USING btree ("autosave");
  CREATE INDEX "_vehicles_v_rels_order_idx" ON "_vehicles_v_rels" USING btree ("order");
  CREATE INDEX "_vehicles_v_rels_parent_idx" ON "_vehicles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_vehicles_v_rels_path_idx" ON "_vehicles_v_rels" USING btree ("path");
  CREATE INDEX "_vehicles_v_rels_optionals_id_idx" ON "_vehicles_v_rels" USING btree ("optionals_id");
  CREATE INDEX "leads_vehicle_idx" ON "leads" USING btree ("vehicle_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "pages_blocks_hero_cta_order_idx" ON "pages_blocks_hero_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_cta_parent_id_idx" ON "pages_blocks_hero_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_text_section_order_idx" ON "pages_blocks_text_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_section_parent_id_idx" ON "pages_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_section_path_idx" ON "pages_blocks_text_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_grid_images_order_idx" ON "pages_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_images_parent_id_idx" ON "pages_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_images_image_idx" ON "pages_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_grid_order_idx" ON "pages_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_parent_id_idx" ON "pages_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_path_idx" ON "pages_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_og_image_idx" ON "pages" USING btree ("og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_cta_order_idx" ON "_pages_v_blocks_hero_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_cta_parent_id_idx" ON "_pages_v_blocks_hero_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_text_section_order_idx" ON "_pages_v_blocks_text_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_section_parent_id_idx" ON "_pages_v_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_section_path_idx" ON "_pages_v_blocks_text_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_grid_images_order_idx" ON "_pages_v_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_grid_images_parent_id_idx" ON "_pages_v_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_images_image_idx" ON "_pages_v_blocks_image_grid_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_grid_order_idx" ON "_pages_v_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_grid_parent_id_idx" ON "_pages_v_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_grid_path_idx" ON "_pages_v_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_og_image_idx" ON "_pages_v" USING btree ("version_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_makes_id_idx" ON "payload_locked_documents_rels" USING btree ("makes_id");
  CREATE INDEX "payload_locked_documents_rels_optionals_id_idx" ON "payload_locked_documents_rels" USING btree ("optionals_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_vehicles_id_idx" ON "payload_locked_documents_rels" USING btree ("vehicles_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_dark_idx" ON "site_settings" USING btree ("logo_dark_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "finance_settings_available_months_order_idx" ON "finance_settings_available_months" USING btree ("_order");
  CREATE INDEX "finance_settings_available_months_parent_id_idx" ON "finance_settings_available_months" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "makes" CASCADE;
  DROP TABLE "optionals" CASCADE;
  DROP TABLE "locations_opening_hours" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "vehicles_highlights" CASCADE;
  DROP TABLE "vehicles_gallery" CASCADE;
  DROP TABLE "vehicles" CASCADE;
  DROP TABLE "vehicles_rels" CASCADE;
  DROP TABLE "_vehicles_v_version_highlights" CASCADE;
  DROP TABLE "_vehicles_v_version_gallery" CASCADE;
  DROP TABLE "_vehicles_v" CASCADE;
  DROP TABLE "_vehicles_v_rels" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "pages_blocks_hero_cta" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_text_section" CASCADE;
  DROP TABLE "pages_blocks_image_grid_images" CASCADE;
  DROP TABLE "pages_blocks_image_grid" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_text_section" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "finance_settings_available_months" CASCADE;
  DROP TABLE "finance_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_optionals_category";
  DROP TYPE "public"."enum_vehicles_availability";
  DROP TYPE "public"."enum_vehicles_condition";
  DROP TYPE "public"."enum_vehicles_fuel";
  DROP TYPE "public"."enum_vehicles_transmission";
  DROP TYPE "public"."enum_vehicles_drivetrain";
  DROP TYPE "public"."enum_vehicles_euro_class";
  DROP TYPE "public"."enum_vehicles_body_type";
  DROP TYPE "public"."enum_vehicles_exterior_color_type";
  DROP TYPE "public"."enum_vehicles_interior_material";
  DROP TYPE "public"."enum_vehicles_status";
  DROP TYPE "public"."enum__vehicles_v_version_availability";
  DROP TYPE "public"."enum__vehicles_v_version_condition";
  DROP TYPE "public"."enum__vehicles_v_version_fuel";
  DROP TYPE "public"."enum__vehicles_v_version_transmission";
  DROP TYPE "public"."enum__vehicles_v_version_drivetrain";
  DROP TYPE "public"."enum__vehicles_v_version_euro_class";
  DROP TYPE "public"."enum__vehicles_v_version_body_type";
  DROP TYPE "public"."enum__vehicles_v_version_exterior_color_type";
  DROP TYPE "public"."enum__vehicles_v_version_interior_material";
  DROP TYPE "public"."enum__vehicles_v_version_status";
  DROP TYPE "public"."enum_leads_type";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_pages_blocks_hero_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_text_section_align";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_text_section_align";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_site_settings_social_platform";`)
}
