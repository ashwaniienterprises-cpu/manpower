import { db } from 'hatchable';
export const access = 'public';
export const methods = ['POST'];
export default async function(req,res){
 const b=req.body||{}; const name=String(b.name||'').trim(), phone=String(b.phone||'').trim(), type=String(b.type||'').trim();
 if(b.website) return res.json({ok:true});
 if(!name||!phone||!type) return res.status(400).json({error:'NAME, PHONE AND APPLICATION TYPE ARE REQUIRED.'});
 if(name.length>120||phone.length>20||String(b.email||'').length>160||String(b.message||'').length>1500) return res.status(400).json({error:'PLEASE CHECK YOUR DETAILS.'});
 await db.query('INSERT INTO applications (applicant_name,phone,email,city,application_type,experience,message) VALUES ($1,$2,$3,$4,$5,$6,$7)',[name,phone,String(b.email||'').slice(0,160),String(b.city||'').slice(0,120),type,String(b.experience||'').slice(0,160),String(b.message||'').slice(0,1500)]);
 res.json({ok:true});
}