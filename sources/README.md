 - in order from oldest to newest
 - this is NOT a complete list of all source codes used
 - despite the name, these sources are not truly "raw"; see ./raw
<br><br>
 - app1-4 are from around 2024; each is different, no recompiles
 - figure app5 and app6 out yourself
 - app7 is update 0.5.1
 - app8 is a bug fix
 - from app8-app11, appjs is recompiled every 15 mins
 - app9, app10, and app11 are all recompiles
 - as of app12, appjs is not recompiled regularly anymore
 - app12 is a very slight code change
<br><br>
 - it is very possible that the bug fix of app7 (what i have labeled app8) came out >=15 mins before i saved app8, therefore app8 is technically a recompile
 - the same is (almost surely) true for the gap between app11 and app12
<br><br>
 - raw source codes for app1, app2, app3, app4, and app5 are missing
 - app1, app2, app3, and app4 are missing GLOB, EXTERNAL_CHECKSUM, FIRST_USED, and LAST_USED
 - app5 is missing EXTERNAL_CHECKSUM and (accurate) FIRST_USED
<br><br>
 - EXTERNAL_CHECKSUM is the number fed into token.sploop.io; it was intended to be a source checksum/integrity check but was never implemented
 - the calculation is just EXTERNAL.toString().length (using the obfuscated EXTERNAL) and is simplified to the known value in non-raw sources
 - it is calculated in the source code here:<br>
if (typeof EXTERNAL == "function") {<br>
&emsp;x = vm(EXTERNAL, GLOB);<br>
}
