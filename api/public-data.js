import { db, storage } from 'hatchable';
export const access = 'public';
export const methods = ['GET'];
export default async function (req,res) {
 const settings=(await db.query('SELECT firm_name, tagline, address, email, phone, gstin, about FROM firm_settings WHERE id=1')).rows[0] || null;
 const rows=(await db.query('SELECT id, title, category, original_name, storage_key, content_type, bytes FROM public_files WHERE published=true ORDER BY created_at DESC LIMIT 100')).rows;
 const files=await Promise.all(rows.map(async f=>({id:f.id,title:f.title,category:f.category,original_name:f.original_name,content_type:f.content_type,bytes:f.bytes,url:await storage.url(f.storage_key)})));
 res.setHeader('Cache-Control','no-store'); res.json({settings,files});
}