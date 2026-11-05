const fs=require('fs'),path=require('path'),assert=require('assert');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const names='Button Input Select Textarea Checkbox Radio DatePicker SearchBar DataTable Pagination Modal Drawer Dropdown Tabs Badge StatusBadge Card StatCard PageHeader EmptyState Loading ConfirmDialog FileUpload Tooltip Toast Skeleton'.split(' ');
for(const n of names)assert(fs.existsSync('src/components/common/'+n+'.jsx'),n);
const files=walk('src');assert(!files.some(f=>/\.tsx?$/.test(f)));
for(const f of files.filter(f=>/\.jsx?$/.test(f))){const s=fs.readFileSync(f,'utf8');assert(!/components\/(ui|shared)\//.test(s),f);assert(!/from ['"](?:lucide|@mui|react-icons|@remixicon)/.test(s),f);for(const m of s.matchAll(/(?:from\s+|import\s*)['"](@\/[^'"]+)['"]/g)){const base='src/'+m[1].slice(2);assert(['','.js','.jsx','/index.js','/index.jsx'].some(ext=>fs.existsSync(base+ext)),f+' unresolved '+m[1]);}}
for(const m of ['crm','production','customer']){assert(!fs.existsSync('src/modules/'+m+'/components/common'));for(const n of ['DataTable','Button','Input','Modal','Badge'])assert(walk('src/modules/'+m).some(f=>fs.readFileSync(f,'utf8').includes('@/components/common/'+n)),m+' missing '+n);}
assert(!fs.existsSync('../hrm-app'));
console.log('Architecture checks passed: '+names.length+' required components, JS/JSX sources, resolved alias imports, Font Awesome icons, and centralized imports across all three modules.');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const dependency of Object.keys(pkg.dependencies || {})) {
  assert(!/^(?:@remixicon\/|lucide|@mui\/icons|react-icons|@fortawesome\/fontawesome-free)/.test(dependency), dependency);
}
assert(fs.existsSync('src/components/icons/FontAwesomeIcon.jsx'));
for (const file of files.filter(f => /\.jsx?$/.test(f))) {
  const source = fs.readFileSync(file, 'utf8');
  if (file !== 'src/components/icons/FontAwesomeIcon.jsx') {
    assert(!source.includes("from '@fortawesome/react-fontawesome'"), file + ': render through the shared icon wrapper');
  }
  for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"](@fortawesome\/free-[^'"]+)['"]/g)) {
    const icons = require(match[2]);
    for (const name of match[1].split(',').map(s => s.trim()).filter(Boolean)) {
      assert(icons[name]?.icon, file + ': unknown Font Awesome icon ' + name);
    }
  }
}
console.log('Font Awesome checks passed: valid icon definitions, one shared renderer, no alternative icon dependencies.');
